import unittest
from abe_schemes.ac17 import setup, keygen, encrypt, encryptFile, decrypt, decryptFile, setGroup

class TestAC17Methods(unittest.TestCase):

    def test_setup(self):
        setup_parameters = setup('MNT224', 2)
        self.assertTrue('pk' in setup_parameters)
        self.assertTrue('msk' in setup_parameters)

    def test_ac17_process(self):
        setup_parameters = setup('MNT224', 2)
        msg = b'test message'
        policy = '(researcher OR therapist)'
        ct = encrypt(setup_parameters['pk'], msg, policy)
        # The attributes MUST be declared in uppercase for key generation, but internal call in Charm Library formats the credentials to uppercase
        attr_sk = keygen(setup_parameters['pk'], setup_parameters['msk'], ['researcher'])
        decrypted_msg = decrypt(setup_parameters['pk'], ct, attr_sk)
        self.assertEqual(msg, decrypted_msg)
        
    def test_ac17_process_file_with_imported_parameters(self):
        setup_parameters = setup('SS512')
        original_file = '<file_path>'
        endpath = '<encrypted_file_path>'
        decrypt_endpath = '<decrypted_file_path>'
        policy = '(researcher OR therapist)'
        encryptFile(setup_parameters['pk'], original_file, endpath, policy)
        # The attributes MUST be declared in uppercase for key generation, but internal call formats the credentials to uppercase
        sk = keygen(setup_parameters['pk'], setup_parameters['msk'], ['researcher'])
        decryptFile(setup_parameters['pk'], endpath, decrypt_endpath, sk)
        
        
        
if __name__ == '__main__':
    unittest.main()