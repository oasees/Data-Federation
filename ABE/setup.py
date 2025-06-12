from setuptools import setup, find_packages

setup(
    name='abe_utils_library',
    version='0.1.0',
    packages=find_packages(include=['abe_schemes', 'abe_utils']),
    description='A Python library for ABE operations.',
    author='Xabier Barguilla',
    install_requires=[]
)