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
import logging
import os
import json
import requests

logger = logging.getLogger("uvicorn.error")




def invoke_create_contract_definition(contract_id, policy_id, asset_id, header_authorization):
#    provider_host = os.getenv("PROVIDER_HOST", "ekodata2.tri.lan")
#    provider_management_port = os.getenv("PROVIDER_MANAGEMENT_PORT", "9193")

#    provider_host_port = os.getenv("PROVIDER_HOST_PORT")

#    url = f"http://{provider_host}:{provider_management_port}/management/v3/contractdefinitions"

    # url = f"https://{provider_host_port}/management/v3/contractdefinitions"

    provider_management_url = os.getenv("PROVIDER_MANAGEMENT_URL")
    url = f"{provider_management_url}/contractdefinitions"

    payload = json.dumps(generate_contract_metadata(contract_id, policy_id, asset_id))
    headers = {
        'Content-Type': 'application/json',
        'X-API-Key': header_authorization
    }
    """headers = {
        'Content-Type': 'application/json'
    }"""

    response = requests.request("POST", url, headers=headers, data=payload)

    print(f"Negotiate contract response={response.text}")
    return response


def invoke_create_contract_definition_equal(contract_id, policy_id, asset_id):
   # provider_host = os.getenv("PROVIDER_HOST", "ekodata2.tri.lan")
   # provider_management_port = os.getenv("PROVIDER_MANAGEMENT_PORT", "9193")

    #url = f"http://{provider_host}:{provider_management_port}/management/v3/contractdefinitions"

    provider_management_url = os.getenv("PROVIDER_MANAGEMENT_URL")
    url = f"{provider_management_url}/contractdefinitions"

    payload = json.dumps(generate_contract_metadata_equal(contract_id, policy_id, asset_id))
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(f"Negotiate contract response={response.text}")
    return response


def generate_contract_metadata(contract_id, policy_id, asset_id):
    contract_metadata = {
           "@context": {
             "edc": "https://w3id.org/edc/v0.0.1/ns/"
           },
           "@id": contract_id,
           "accessPolicyId": policy_id,
           "contractPolicyId": policy_id,
           "assetsSelector":  {
               "@type": "edc:Criterion",
               "edc:operandLeft": "https://w3id.org/edc/v0.0.1/ns/id",
               "edc:operator": "in",
               "edc:operandRight": asset_id
           }
    }
    return contract_metadata


"""def generate_contract_metadata(contract_id, policy_id, asset_id):
    contract_metadata = {
        "@context": {
            "edc": "https://w3id.org/edc/v0.0.1/ns/"
        },
        "@id": contract_id,
        "accessPolicyId": policy_id,
        "contractPolicyId": policy_id,
        "assetsSelector": []
    }
    return contract_metadata
"""

def generate_contract_metadata_equal(contract_id, policy_id, asset_id):
    contract_metadata = {
        "@context": {
            "edc": "https://w3id.org/edc/v0.0.1/ns/"
        },
        "@id": contract_id,
        "accessPolicyId": policy_id,
        "contractPolicyId": policy_id,
        "assetsSelector": {
            "@type": "edc:Criterion",
            "edc:operandLeft": "https://w3id.org/edc/v0.0.1/ns/id",
            "edc:operator": "=",
            "edc:operandRight": asset_id
        }
    }
    return contract_metadata
