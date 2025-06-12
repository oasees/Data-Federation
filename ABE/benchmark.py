from abe_schemes.ac17 import setup as ac17_setup, keygen as ac17_keygen, encrypt as ac17_encrypt, decrypt as ac17_decrypt, getGroup as ac17_getGroup, setGroup as ac17_setGroup
from abe_schemes.bsw07 import setup as bsw07_setup, keygen as bsw07_keygen, encrypt as bsw07_encrypt, decrypt as bsw07_decrypt, getGroup as bsw07_getGroup, setGroup as bsw07_setGroup
from abe_schemes.waters09 import setup as waters09_setup, keygen as waters09_keygen, encrypt as waters09_encrypt, decrypt as waters09_decrypt, getGroup as waters09_getGroup, setGroup as waters09_setGroup
from abe_utils.utils import initBenchmark, endBenchmark

def setup_variables():
    global msg, listAttributes, pairing_curve, max_attributes
    msg = b'test message'
    max_attributes = 100
    listAttributes = []
    for i in range(0,max_attributes):
        listAttributes.append(str(i))

    pairing_curve="BN254" # POSSIBLE CURVES: SS512, SS1024, MNT159, MNT201, MNT224, BN254
    
def generate_policy(number):
    policy = ""
    for i in range(0,number):
        if i == 0:
            policy = "(" + listAttributes[i]
        elif i == number - 1:
            policy = policy + " AND " + listAttributes[i] + ")"
        else:
            policy = policy + " AND " + listAttributes[i]
    return policy     
   
# AC17 BENCHMARKS

def ac17_benchmark():
    print(' ------------------------ \n | AC17 SETUP BENCHMARK | \n ------------------------')
    ac17_setGroup(pairing_curve)
    group = ac17_getGroup()
    initBenchmark(group)
    setup_parameters = ac17_setup(pairing_curve, 2)
    results = endBenchmark(group)
    print('SETUP METRICS:')
    print(results)
    
    keygen_results = []
    encrypt_results = []
    decrypt_results = []
    
    for i in range(1, int(((max_attributes/5)+1))):
        policy = generate_policy(i*5)
        # Encryption
        initBenchmark(group)
        ct = ac17_encrypt(setup_parameters['pk'], msg, policy)
        results = endBenchmark(group)
        encrypt_results.append(results)
        # Key Generation
        initBenchmark(group)
        keys = ac17_keygen(setup_parameters['pk'], setup_parameters['msk'], listAttributes[:i*5])
        results = endBenchmark(group)
        keygen_results.append(results)
        # Decryption
        initBenchmark(group)
        ac17_decrypt(setup_parameters['pk'], ct, keys)
        results = endBenchmark(group)
        decrypt_results.append(results)
    
    print(' -------------------------- \n | AC17 ENCRYPT BENCHMARK | \n --------------------------')
    for i in range(0, int(((max_attributes/5)))):
        print('ENCRYPTION', i+1,'METRICS (',(i+1)*5,'ATTRIBUTES):')
        print(encrypt_results[i])
        
    print(' ------------------------- \n | AC17 KEYGEN BENCHMARK | \n -------------------------')
    for i in range(0, int(((max_attributes/5)))):
        print('ATTRIBUTE GENERATION', i+1,'METRICS (',(i+1)*5,'ATTRIBUTES):')
        print(keygen_results[i])
    
    print(' -------------------------- \n | AC17 DECRYPT BENCHMARK | \n --------------------------')
    for i in range(0, int(((max_attributes/5)))):
        print('DECRYPTION', i+1,'METRICS (',(i+1)*5,'ATTRIBUTES):')
        print(decrypt_results[i])
    
# BSW07 BENCHMARKS

def bsw07_benchmark():
    print(' ------------------------- \n | BSW07 SETUP BENCHMARK | \n -------------------------')
    bsw07_setGroup(pairing_curve)
    group = bsw07_getGroup()
    initBenchmark(group)
    setup_parameters = bsw07_setup(pairing_curve)
    results = endBenchmark(group)
    print('SETUP METRICS:')
    print(results)
    
    keygen_results = []
    encrypt_results = []
    decrypt_results = []
    
    for i in range(1, int(((max_attributes/5)+1))):
        policy = generate_policy(i*5)
        # Encryption
        initBenchmark(group)
        ct = bsw07_encrypt(setup_parameters['pk'], msg, policy)
        results = endBenchmark(group)
        encrypt_results.append(results)
        # Key Generation
        initBenchmark(group)
        keys = bsw07_keygen(setup_parameters['pk'], setup_parameters['msk'], listAttributes[:i*5])
        results = endBenchmark(group)
        keygen_results.append(results)
        # Decryption
        initBenchmark(group)
        bsw07_decrypt(setup_parameters['pk'], ct, keys)
        results = endBenchmark(group)
        decrypt_results.append(results)
    
    print(' --------------------------- \n | BSW07 ENCRYPT BENCHMARK | \n ---------------------------')
    for i in range(0, int(((max_attributes/5)))):
        print('ENCRYPTION', i+1,'METRICS (',(i+1)*5,'ATTRIBUTES):')
        print(encrypt_results[i])
        
    print(' -------------------------- \n | BSW07 KEYGEN BENCHMARK | \n --------------------------')
    for i in range(0, int(((max_attributes/5)))):
        print('ATTRIBUTE GENERATION', i+1,'METRICS (',(i+1)*5,'ATTRIBUTES):')
        print(keygen_results[i])
    
    print(' --------------------------- \n | BSW07 DECRYPT BENCHMARK | \n ---------------------------')
    for i in range(0, int(((max_attributes/5)))):
        print('DECRYPTION', i+1,'METRICS (',(i+1)*5,'ATTRIBUTES):')
        print(decrypt_results[i])
    
# WATERS09 BENCHMARKS

def waters09_benchmark():
    print(' ---------------------------- \n | WATERS09 SETUP BENCHMARK | \n ----------------------------')
    waters09_setGroup(pairing_curve)
    group = waters09_getGroup()
    initBenchmark(group)
    setup_parameters = waters09_setup(pairing_curve)
    results = endBenchmark(group)
    print('SETUP METRICS:')
    print(results)
    
    keygen_results = []
    encrypt_results = []
    decrypt_results = []
    
    for i in range(1, int(((max_attributes/5)+1))):
        policy = generate_policy(i*5)
        # Encryption
        initBenchmark(group)
        ct = waters09_encrypt(setup_parameters['pk'], msg, policy)
        results = endBenchmark(group)
        encrypt_results.append(results)
        # Key Generation
        initBenchmark(group)
        keys = waters09_keygen(setup_parameters['pk'], setup_parameters['msk'], listAttributes[:i*5])
        results = endBenchmark(group)
        keygen_results.append(results)
        # Decryption
        initBenchmark(group)
        waters09_decrypt(setup_parameters['pk'], ct, keys)
        results = endBenchmark(group)
        decrypt_results.append(results)
    
    print(' ------------------------------ \n | WATERS09 ENCRYPT BENCHMARK | \n ------------------------------')
    for i in range(0, int(((max_attributes/5)))):
        print('ENCRYPTION', i+1,'METRICS (',(i+1)*5,'ATTRIBUTES):')
        print(encrypt_results[i])
        
    print(' ----------------------------- \n | WATERS09 KEYGEN BENCHMARK | \n -----------------------------')
    for i in range(0, int(((max_attributes/5)))):
        print('ATTRIBUTE GENERATION', i+1,'METRICS (',(i+1)*5,'ATTRIBUTES):')
        print(keygen_results[i])
    
    print(' ------------------------------ \n | WATERS09 DECRYPT BENCHMARK | \n ------------------------------')
    for i in range(0, int(((max_attributes/5)))):
        print('DECRYPTION', i+1,'METRICS (',(i+1)*5,'ATTRIBUTES):')
        print(decrypt_results[i])

if __name__ == '__main__':
    setup_variables()
    ac17_benchmark()
    print('============================================')
    bsw07_benchmark()
    print('============================================')
    waters09_benchmark()