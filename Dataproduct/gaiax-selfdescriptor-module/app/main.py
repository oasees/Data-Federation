import logging
import os
import sys
import uvicorn
from datamite.models.dataProductResourcesBody import DataProductResourcesModel
from datamite.models.legalParticipantBodyModel import LegalParticipantBodyModel
from datamite.utils.certificate_utils import sign_doc, signVeriablePresentation
from datamite.utils.gaiax_utils import callCredentialsEventService, callComplianceAPI
from datamite.utils.neo4j_utils import loadInNeo4j, getData_productsList, getData_productsByName
from datamite.utils.postgres_utils import getCesData
from datamite.utils.selfDescription_utils import createDidDocument, \
    createLegalParticipantVerifiablePresentation, \
    createDataProductWithResourcesVerifiablePresentation, \
    createAndPublishDataProductWithResourcesVerifiablePresentation
from fastapi import FastAPI

from app.utils.connector_utils import load_asset_edc


from contextlib import asynccontextmanager


tags_metadata = [
    {
        "name": "Oasees API"
    },
    {
        "name": "Oasees testing API"
    },
]





logger = logging.getLogger("uvicorn.error")

DEBUG = os.getenv("DEBUG") or False



@asynccontextmanager
async def lifespan(app: FastAPI):
    logger = logging.getLogger("uvicorn.error")
    handler = logging.StreamHandler()
    handler.setFormatter(logging.Formatter("%(asctime)s | %(levelname)s | %(module)s | %(funcName)s | %(message)s"))
    logger.addHandler(handler)
    logging_level = logging.INFO
    if DEBUG:
        logging_level = logging.DEBUG
    logger.setLevel(logging_level)
    logger.propagate = False
    yield



app = FastAPI(lifespan=lifespan, title="Oasees", description=f"Oasees API documentation", openapi_tags=tags_metadata)


#######################################################################
# Create a did.json file
#Output: json document for the did
#######################################################################
@app.post("/diddocument", tags=["Oasees API"])

async def create_did(domain:str):

    return createDidDocument(domain)





#######################################################################
# Create a Gaia-X Legal Participant
#Input: mandatory input data
#Output: JSON for LegalParticipant signed/unsigned
#######################################################################


@app.post("/legalparticipant", tags=["Oasees API"])


async def createLegalParticipant(body:LegalParticipantBodyModel):

    return createLegalParticipantVerifiablePresentation (body)


#######################################################################
# Create a definition for a DataProduct/Service Offering
#Input: mandatory input data
#Output: JSON for DataProduct/Service signed/unsigned
#######################################################################
"""
@app.post("/createDataProduct", tags=["Datamite External API"])
async def createDataProduct(body:DataProductBodyModel):

    return createDataProductVeriableCredential(body)
"""

#######################################################################
# Create a definition for a DataProduct/Service Offering with resources DataResources
#Input: mandatory input data
#Output: JSON for DataProduct/Service Offering with DataResources
#######################################################################

@app.post("/dataproducts", tags=["Oasees API"])

async def createDataProductWithResources(body:DataProductResourcesModel):

    return createDataProductWithResourcesVerifiablePresentation(body)





#######################################################################
# Create a definition for a DataProduct/Service Offering with resources DataResources
#Input: mandatory input data
#Output: JSON for DataProduct/Service Offering with DataResources
#######################################################################
@app.post("/publish-dataproduct", tags=["Oasees API"])



async def createAndPublishDataProduct(body:DataProductResourcesModel, dataResouceAPI_URL:str):

    print ("Create And Publish")
    output=createAndPublishDataProductWithResourcesVerifiablePresentation(body)
#    print("Output create and publish data product with resources")
#    print (output)
#    output="CES"
    if output is not False or output is not None:
    #if output is not False:
        outputEDC = load_asset_edc(body, dataResouceAPI_URL)
        print (outputEDC)
        return outputEDC
    else: return "An error  has happened during the publication of the data product"



#######################################################################
# Method for getting dataProducts from Neo4j

#Output: list of dataProducts
#######################################################################
@app.get("/dataproducts", tags=["Oasees API"])

async def getDataProductsList():

    return getData_productsList()



#######################################################################
# Method for getting dataProducts by name from Neo4j

#Output: dataProduct Name
#######################################################################
@app.get("/dataproducts/{dataProductName}", tags=["Oasees API"])

async def getDataProductByName(dataProductName:str):

    return getData_productsByName(dataProductName)

#######################################################################
# Method for getting CesRecords

#Output: cesProducts
#######################################################################
@app.get("/cesrecords", tags=["Oasees API"])

async def getCesRecords():

    return getCesData()



#######################################################################
# Sign a verifiable credential
#Input: data for being signed and domain
#Output: data signed
#######################################################################
@app.post("/signVC", tags=["Oasees testing API"])


async def signVC(data: dict , issuerKey:str):

    return sign_doc(data,issuerKey)


#######################################################################
# Sign a verifiable presentation
#Input: data for being signed and domain
#Output: data signed
#######################################################################
@app.post("/sign-vp", tags=["Oasees testing API"])

async def signVP(data: dict , domain:str):


    return signVeriablePresentation(data,domain)




#######################################################################
# Method for calling to Gaia-X Compliance Service
#Input: a Veriable Presentation in json format
#Output: Compliance service output
#######################################################################


@app.post("/compliance", tags=["Oasees testing API"])
async def callToCompliance(body: dict):

    return callComplianceAPI(body)




#######################################################################
# Method for calling to Credential Event Service and registers serviceOffering
#Input: a compliance Veriable Presentation for Service Offering
#Output: Credential Event Service output
#######################################################################
@app.post("/credential-event-service", tags=["Oasees testing API"])
async def callToCredentialsEventService(body: dict):

    return callCredentialsEventService(body)



#######################################################################
# Method for testing Neo4j
#Input: a compacted json file
#Output: json loaded in neo4j graph database
#######################################################################
@app.post("/loadNeo4j", tags=["Oasees testing API"])

async def loadNeo4j(dataProductName:str,data:dict):

    return loadInNeo4j(dataProductName,data)




if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9102)


