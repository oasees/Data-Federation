# ABE Library

This library uses Attribute-Based Encryption (ABE) schemas from [Charm-Crypto](https://github.com/JHUISI/charm).

## Prerequisites

- Python version 3.10 or higher.
- The [setuptools](https://pypi.org/project/setuptools/) package installed.
- Charm installed.

## Integration of the Library

This library can be installed through pip locally. To do this, follow the steps bellow.

### Dependencies

The library uses the [Charm-Crypto](https://github.com/JHUISI/charm) library. The latest pip repository version of this library is outdated. For the correct usage of Charm with this library, download the latest version through the CHarm repository and install it following the [installation instructions](https://jhuisi.github.io/charm/install_source.html) or through a local pip installation.

For building the library, you will need to have the packages `twine`, `wheel` and `setuptools` installed in your python environment.

### Build the library

Build the library using the command:

```sh
python setup.py bdist_wheel
```

### Installation

The library can be installed in your python environment using pip.

```sh
pip install ./<library_repository>
```

Make sure that you have previously built the library.

#### Caution

There have been reports informing issues in the installation of Charm in Windows devices. This library has been tested in Linux environments. Theoretically, the usage of [WSL](https://learn.microsoft.com/es-es/windows/wsl/about) should allow the usage of Charm, and consequently this library. However, it has not been currently tested.

Have this information in mind in case that you want ot use it in a system with a Windows OS.

## Testing

For testing a test file, run the command `python -m unittest tests/<test_file>`. For testing all tests files, run the command `python -m unittest discover -s tests -p '*test.py'`

## Benchmarking

For Benchmarking, run the command `python benchmark.py`
