import unittest
from abe_schemes.waters09 import setup, keygen, encrypt, decrypt, encryptFile, decryptFile

class TestWaters09Methods(unittest.TestCase):

    def test_setup(self):
        setup_parameters = setup('SS512')
        self.assertTrue('pk' in setup_parameters)
        self.assertTrue('msk' in setup_parameters)
    
    def test_waters09_process(self):
        setup_parameters = setup('SS512')
        msg = b'test message'
        policy = '(patient OR (researcher AND therapist))'
        ct = encrypt(setup_parameters['pk'], msg, policy)
        # The attributes MUST be declared in uppercase for key generation, but internal call in Charm Library formats the credentials to uppercase
        attr_sk = keygen(setup_parameters['pk'], setup_parameters['msk'], ['researcher', 'patient'])
        decrypted_msg = decrypt(setup_parameters['pk'], ct, attr_sk)
        self.assertEqual(msg, decrypted_msg)
        
    def test_waters09_process_file_with_imported_parameters(self):
        setup_parameters = setup('SS512')
        original_file = '<file_path>'
        endpath = '<encrypted_file_path>'
        decrypt_endpath = '<decrypted_file_path>'
        policy = '(researcher OR therapist)'
        encryptFile(setup_parameters['pk'], original_file, endpath, policy)
        # The attributes MUST be declared in uppercase for key generation, but internal call formats the credentials to uppercase
        attr_sk = keygen(setup_parameters['pk'], setup_parameters['msk'], ['researcher'])
        decryptFile(setup_parameters['pk'], endpath, decrypt_endpath, attr_sk)
    

if __name__ == '__main__':
    unittest.main()