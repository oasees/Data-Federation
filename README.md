# 📡 Data Federation

**Data Federation** is a modular platform designed to support the creation, publication, and consumption of data products within a federated ecosystem.  
The project provides a catalog service, a reference data product implementation, and a signing module to ensure integrity and trust across distributed data domains.

---


## 🧱 Repository Structure

| Directory | Description |
|----------|-------------|
| **ABE/** | Python module for Attribute-Based Encryption. |
| **Catalogue/** | Frontend application responsible for fetch and consume data products. |
| **Dataproduct/** | API for generating and publishig gaia-X dataproducts based on Loire. |
| **Schema Analyser/** | Component for analysing W3C Credential Schemas. |
| **loire_signer/** | Python module for signing verifiable credentials ready for Loire. |
|**README.md** | Project documentation. |

Languages used in the repository:
- TypeScript (~64%)
- Python (~32%)
- Docker (~4%)
- JavaScript (~0.1%)

---

## 📚 Components Overview

### **1. ABE**
A Python module providing: 

- ABE schemes and utils to encrypt different types of data

---

### **2. Catalogue**
A TypeScript-based service that acts as the **central registry** for the federation.  
Typical responsibilities include:

- Fetching data products  
- Consumption of data products based on EDC connectors  

---

### **3. Dataproduct**
A reference implementation of Gaia-x based dataproducts.

- API exposure  
- Integration with the Gaia-X Lab Clearing House  
- Generate verifiable presentation for participants and data products.
- Deployment configuration  

Use this module as a template for building new data products.

---

### **4. Schema Analyser**
A TypeScript-based service that allows for:

- Analysing and verifying credential against schemas accessible by url or stored locally.

---

### **5. loire_signer**
A Python module providing:

- API for signing verifiable presentation for Loire

---

## 🛠️ Requirements

Depending on the module you want to run:

- **Node.js** (Catalogue, Dataproduct, Schema Analyser)
- **Python 3.10+** (ABE, loire_signer)
- **Docker** (optional, for containerized deployment)
- **Make** (optional, for automation scripts)

---

## ▶️ Getting Started

### Clone the repository
```bash
git clone https://github.com/oasees/Data-Federation.git
cd Data-Federation
