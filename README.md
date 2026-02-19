# 📡 Data Federation

**Data Federation** is a modular platform designed to support the creation, publication, and consumption of data products within a federated ecosystem.  
The project provides a catalog service, a reference data product implementation, and a signing module to ensure integrity and trust across distributed data domains.

---


## 🧱 Repository Structure

| Directory | Description |
|----------|-------------|
| **Catalogue/** | Frontend application responsible for fetch and consume data products. |
| **Dataproduct/** | API for generating and publishig gaia-X dataproducts based on Loire. |
| **loire_signer/** | Python module for signing verifiable credentials ready for Loire. |
|**README.md** | Project documentation. |

Languages used in the repository:
- TypeScript (~64%)
- Python (~32%)
- Docker (~4%)
- JavaScript (~0.1%)

---

## 📚 Components Overview

### **1. Catalogue**
A TypeScript-based service that acts as the **central registry** for the federation.  
Typical responsibilities include:

- Fetching data products  
- Consumption of data products based on EDC connectors  

---

### **2. Dataproduct**
A reference implementation of Gaia-x based dataproducts.

- API exposure  
- Integration with the Gaia-X Lab Clearing House  
- Generate verifiable presentation for participants and data products.
- Deployment configuration  

Use this module as a template for building new data products.

---

### **3. loire_signer**
A Python module providing:

- API for signing verifiable presentation for Loire

---

## 🛠️ Requirements

Depending on the module you want to run:

- **Node.js** (Catalogue, Dataproduct)
- **Python 3.10+** (loire_signer)
- **Docker** (optional, for containerized deployment)
- **Make** (optional, for automation scripts)

---

## ▶️ Getting Started

### Clone the repository
```bash
git clone https://github.com/oasees/Data-Federation.git
cd Data-Federation
