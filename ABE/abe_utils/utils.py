from charm.toolbox.pairinggroup import GT
from charm.toolbox.symcrypto import AuthenticatedCryptoAbstraction
from charm.core.math.pairing import hashPair as sha2
from charm.core.engine.util import objectToBytes, bytesToObject
    

def decodeNumbersToString(numbs):
    recoveredbytes = numbs.to_bytes((numbs.bit_length() + 7) // 8, 'little')
    decodedstring = recoveredbytes.decode('utf-8')
    return decodedstring

def decryptWithACA(enc_msg, key):
    cipher = AuthenticatedCryptoAbstraction(sha2(key))
    decrypted_msg = cipher.decrypt(enc_msg)
    return decrypted_msg

def encodeStringToNumbers(string):
    new_bytes = string.encode('utf-8') #+ b'\x01'
    new_int = int.from_bytes(new_bytes, 'little')
    return new_int

def getStrFromItem(item, group):
    item_bytes = objectToBytes(item, group)
    item_str = item_bytes.decode('utf-8')
    return item_str

def getItemFromStr(item_str, group):
    item_bytes = item_str.encode('utf-8')
    new_item = bytesToObject(item_bytes, group)
    return new_item

def getFileBytes(path):
    with open(path, 'rb') as f:
        chipher_file_text_bytes = f.read()
    return chipher_file_text_bytes

def encryptWithACA(group, msg):
    key = group.random(GT)
    cipher = AuthenticatedCryptoAbstraction(sha2(key))
    encrypted_msg = cipher.encrypt(msg)
    return {'enc_msg': encrypted_msg, 'key': key}

def getFileBytes(file_path):
    bin_data = open(file_path, 'rb').read()
    return bin_data

def parseAttributes(attributes):
    return list(map(lambda attribute: attribute.upper(), attributes))

def initBenchmark(group):
    group.InitBenchmark()
    group.StartBenchmark(["RealTime", "CpuTime"])
    
def endBenchmark(group):
    group.EndBenchmark()
    benchmarks = group.GetGeneralBenchmarks()
    cpu_time = benchmarks['CpuTime']
    real_time = benchmarks['RealTime']
    return {"cpu_time":cpu_time, "real_time": real_time}

def extractPolicy(ct):
    return ct['c1']['policy']