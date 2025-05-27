"""
MIT License

Copyright (c) 2024 Tecnalia, Basque Research & Technology Alliance (BRTA)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""

import json
import logging
import os
import uuid
from datamite.models.dataProductResourcesBody import DataProductResourcesModel
from fastapi import HTTPException

from app.utils.create_asset import invoke_create_asset
from app.utils.create_policy import invoke_create_policy, checkPolicyId
from app.utils.create_contract_definition import invoke_create_contract_definition
logger = logging.getLogger("uvicorn.error")

def load_asset_edc(body:DataProductResourcesModel, dataResouceAPi_URL:str):

    header_authorization = os.getenv("HEADER_AUTHORIZATION")

    # asset_id = asset_id.replace(os.getenv("DOMAIN_PART"),"")
    # Create asset

    #get policy metadata
    print(body.dataProductPolicy)
    policyData=body.dataProductPolicy
    policyData=policyData.replace("'", "\"")
    print(policyData)

    #get the policyId
    policy_json = json.loads(policyData)
    policy_id=policy_json["@id"]

    print(policy_id)
    # check new data type

    for dataresource in body.dataResources:
        formatType = body.dataAccount[0].formatType
        if dataresource.dataResourceInfo is not None:
            create_asset_response = invoke_create_asset(dataresource.dataResourceInfo.name, body.dataProductName,
                                                        formatType, dataresource.dataResourceInfo.description,
                                                        dataResouceAPi_URL,
                                                        header_authorization)
            if not create_asset_response.ok:
                raise HTTPException(status_code=400, detail=json.loads(create_asset_response.text))

            # Create policy


            #policy_id = os.getenv("POLICY_ID")


            contract_uuid = uuid.uuid4()



            contract_id = "contract-"+policy_id+"-"+str(contract_uuid) #os.getenv("CONTRACT_ID")
            policyExist = checkPolicyId(policy_id, header_authorization)
            if not policyExist:
                
                create_policy_response = invoke_create_policy(policyData, header_authorization)
                print (json.loads(create_policy_response.text))

            create_contract_response = invoke_create_contract_definition(contract_id, policy_id,
                                                                         dataresource.dataResourceInfo.name,
                                                                         header_authorization)

            print(json.loads(create_contract_response.text))


    print (f'Asset {body.dataProductName} created')
    return (f'Asset {body.dataProductName} created')

