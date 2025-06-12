from charm.schemes.abenc.ac17 import AC17CPABE
from charm.toolbox.pairinggroup import PairingGroup
from charm.toolbox.secretutil import SecretUtil
from abe_utils.utils import encryptWithACA, decryptWithACA, parseAttributes, getFileBytes
from charm.core.engine.util import objectToBytes, bytesToObject

cpabe = ""
group = ""

def getGroup():
    return group

def setGroup(pairing_group):
    global group
    group = PairingGroup(pairing_group)

def setup(pairing_group, assump_size):
    global group
    group = PairingGroup(pairing_group)
    global cpabe
    cpabe = AC17CPABE(group, assump_size)
    
    (pk, msk) = cpabe.setup()
    return {'pk': pk, 'msk': msk}

def keygen(pk, msk, attr_list):
    if cpabe == "" or group == "":
        raise Exception("Setup process missing!")
    
    parsed_attributes = parseAttributes(attr_list)
    secret_key = cpabe.keygen(pk, msk, parsed_attributes)
    return secret_key

def encrypt(pk, msg, policy):
    if cpabe == "" or group == "":
        raise Exception("Setup process missing!")
    
    # Encryption with AuthenticatedCryptoAbstraction
    aca_elements = encryptWithACA(group, msg)
    
    # Encrypting the AuthenticatedCryptoAbstraction key with ABE
    c1 = cpabe.encrypt(pk, aca_elements['key'], policy)
    
    return {'c1': c1, 'c2': aca_elements['enc_msg']}

def decrypt(pk, ct, secret_key):
    if cpabe == "" or group == "":
        raise Exception("Setup process missing!")
    
    # Decrypting AuthenticatedCryptoAbstraction key with ABE
    key = cpabe.decrypt(pk, ct['c1'], secret_key)
    if key is None:
        raise Exception("failed to decrypt!")
    
    # Decrypting message with AuthenticatedCryptoAbstraction
    decrypted_msg = decryptWithACA(ct['c2'], key)
    return decrypted_msg

def encryptFile(pk, file_path, end_path, policy):
    if cpabe == "" or group == "":
        raise Exception("Setup process missing!")
    
    with open(file_path, 'rb') as f:
        bin_data = f.read()
        
    if type(bin_data) != bytes and type(policy) != str:
        raise Exception("message and policy not right type!")
    ct = encrypt(pk, bin_data, policy)
    
    altering_file = open(end_path, 'wb')

    # Override policy BinNode format to string for serialization.
    ct['c1']['policy'] = ct['c1']['policy'].__repr__()
    bytes_cipher = objectToBytes(ct, group)
    altering_file.write(bytes_cipher)
    altering_file.close()
    
    
def decryptFile(pk, file_path, end_path, sk):
    if cpabe == "" or group == "":
        raise Exception("Setup process missing!")
    
    chipher_file_text_bn = getFileBytes(file_path)
    
    
    cipher_file_dict = bytesToObject(chipher_file_text_bn, group)
    util = SecretUtil(group, verbose=False)
    
    # Transform back policy string into BinNode for decryption
    cipher_file_dict['c1']['policy'] = util.createPolicy(cipher_file_dict['c1']['policy'])
    
    deciphered_msg = decrypt(pk, cipher_file_dict, sk)
    
    deciphered_file = open(end_path, 'wb')
    newFileByteArray = bytes(deciphered_msg)
    deciphered_file.write(newFileByteArray)
    deciphered_file.close()