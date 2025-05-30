import json
import os

import jwt
from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, HTTPException
from cryptography.hazmat.primitives.asymmetric import dsa, rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.serialization import load_pem_private_key
from jwcrypto import jwk, jws
from jwcrypto.common import json_encode
from pyld import jsonld
app = FastAPI()


def sign_document(document: dict) -> str:
    global privkey, jwstoken
    try:

        import jwt

        from cryptography.hazmat.primitives import serialization
        import jwt

       
        with open(os.getenv("PRIVATE_KEY_FILE_NAME"), "rb") as key_file:
            private_key = serialization.load_pem_private_key(
                key_file.read(),
                password=None  # Si la clave tiene contraseña, colócala aquí
            )

    except Exception as error:
        print("Error reading private key:  %s" % error)

    did_web = "did:web:"+os.getenv("DOMAIN")

    document["issuer"] = did_web
    document["validFrom"] = datetime.now(timezone.utc).isoformat(timespec='milliseconds') + "+00:00"
    never_expires=os.getenv("EXPIRES")
    if never_expires =="True":
            document.pop("validUntil", None)
    else:

        document["validUntil"] = (datetime.now(timezone.utc) + timedelta(days=int(os.getenv("DAYS_EXPIRES")))).isoformat(timespec='milliseconds')
    protected_header = {
        "alg": "PS256",
        "typ": "vc+jwt" if "credentialSubject" in document else "vp+jwt",
        "cty": "vc" if "credentialSubject" in document else "vp",
        "iss": did_web,
        "kid": did_web+os.getenv("JWKS_KEY_NAME")
    }

   
    # Sign JWT with RSA key
    token = jwt.encode(document, private_key, algorithm=os.getenv("PRIVATE_KEY_ALGORITHM"), headers=protected_header)

    print(token) 
    
    return token
    

