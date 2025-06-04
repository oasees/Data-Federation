"""

"""
import json
import logging
import os
from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from app.utils.signUtils import sign_document

from datetime import datetime, timedelta, timezone

from app.models.apiModels import EnvelopedVerifiableCredential, VerifiablePresentation,VerifiableCredential
tags_metadata = [
    {
        "name": "Oasees Loire Signer"
    }
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






app = FastAPI(lifespan=lifespan,title="Oasees", description=f"Oasees API documentation", openapi_tags=tags_metadata)




@app.post("/generate_jwt_signed_vc")
async def sign_vc_array(documents: list[dict])-> list[dict]:

    vc_jwts=[]
    for doc in documents:
        
        print (sign_document(doc))
        vc_jwts.append(sign_document(doc))
    listEVC=[] 
    for element in vc_jwts:
        envelopeCredential = EnvelopedVerifiableCredential(context="https://www.w3.org/ns/credentials/v2", id="data:application/vc+jwt,"+element, type="EnvelopedVerifiableCredential")
        listEVC.append(envelopeCredential.model_dump(by_alias=True))
    return listEVC    

@app.post("/generete_jwt_signed_vp")
async def vc_array_to_verifiable_presentation(enveloped_vc_array: list[dict] ) -> str:

    contextArray=[]
    contextArray.append("https://www.w3.org/ns/credentials/v2")
    contextArray.append("https://www.w3.org/ns/credentials/examples/v2")
    vp = VerifiablePresentation(context=contextArray, type="VerifiablePresentation",verifiableCredential=enveloped_vc_array)
    token=sign_document(vp.model_dump(by_alias=True))
    return token

if __name__ == "__main__":

    uvicorn.run(app, host="0.0.0.0", port=9103)
