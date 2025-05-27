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
import requests
logger = logging.getLogger("uvicorn.error")


def checkPolicyId(policy_id, header_authorization):
    #provider_host = os.getenv("PROVIDER_HOST")
    #provider_management_port = os.getenv("PROVIDER_MANAGEMENT_PORT")

    #provider_host_port = os.getenv("PROVIDER_HOST_PORT")

    #url = f"http://{provider_host}:{provider_management_port}/management/v3/policydefinitions/request"

    # url = f"https://{provider_host_port}/management/v3/policydefinitions/request"

    provider_management_url = os.getenv("PROVIDER_MANAGEMENT_URL")
    url = f"{provider_management_url}/policydefinitions/request"


    headers = {
        'Content-Type': 'application/json',
        'X-API-Key': header_authorization
    }
    """headers = {
        'Content-Type': 'application/json'
    }"""
    response = requests.request("POST", url, headers=headers)
    response_json = json.loads(response.text)
    for policy in response_json:

        print(policy.get("@id"))
        if (policy.get("@id") == policy_id):
            return True
            break

"""
def invoke_create_policy(policy_id, header_authorization):
    #provider_host = os.getenv("PROVIDER_HOST", "ekodata2.tri.lan")
    #provider_management_port = os.getenv("PROVIDER_MANAGEMENT_PORT", "9193")

    #provider_host_port = os.getenv("PROVIDER_HOST_PORT")

    #url = f"http://{provider_host}:{provider_management_port}/management/v3/policydefinitions"

    # url = f"https://{provider_host_port}/management/v3/policydefinitions"

    provider_management_url = os.getenv("PROVIDER_MANAGEMENT_URL")
    url = f"{provider_management_url}/policydefinitions/request"



    payload = json.dumps(generate_policy_metadata_without_restrictions(policy_id))
    headers = {
        'Content-Type': 'application/json',
        'X-API-Key': header_authorization
    }
    """"""headers = {
        'Content-Type': 'application/json'
    }""""""
    response = requests.request("POST", url, headers=headers, data=payload)

    print(f"Create policy response={response.text}")
    return response

"""

def invoke_create_policy(policy_data, header_authorization):


    provider_management_url = os.getenv("PROVIDER_MANAGEMENT_URL")
    url = f"{provider_management_url}/policydefinitions"


    headers = {
        'Content-Type': 'application/json',
        'X-API-Key': header_authorization
    }
    """headers = {
        'Content-Type': 'application/json'
    }"""

    response = requests.request("POST", url, headers=headers, data=policy_data)
   # response = requests.request("POST", url, headers=headers, data=payload)

    print(f"Create policy response={response.text}")
    return response


def invoke_create_policy_time(policy_id, policy_time_interval, policy_time_interval_start_date,
                              policy_time_interval_end_date):
    #provider_host = os.getenv("PROVIDER_HOST", "ekodata2.tri.lan")
    #provider_management_port = os.getenv("PROVIDER_MANAGEMENT_PORT", "9193")

    #url = f"http://{provider_host}:{provider_management_port}/management/v3/policydefinitions"

    provider_management_url = os.getenv("PROVIDER_MANAGEMENT_URL")
    url = f"{provider_management_url}/policydefinitions/request"



    payload = json.dumps(generate_policy_metadata_time(policy_id, policy_time_interval, policy_time_interval_start_date,
                                                       policy_time_interval_end_date))
    headers = {
        'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)

    print(f"Create policy response={response.text}")
    return response


def generate_policy_metadata_time(policy_id, policy_time_interval, policy_time_interval_start_date,
                                  policy_time_interval_end_date):
    policy_metadata = {
        "@context": {
            "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
        },
        "@id": policy_id,
        "@type": "edc:PolicyDefinition",
        "policy": {
            "@context": "http://www.w3.org/ns/odrl.jsonld",
            "@type": "Set",
            "permission": [],
            "prohibition": [],
            "obligation": []
        }
    }
    if (policy_time_interval == "true") and (len(policy_time_interval_start_date) > 0) and (
            len(policy_time_interval_end_date) > 0):
        permission_metadata = [
            {
                "action": "use",
                "constraint": [
                    {
                        "@type": "AtomicConstraint",
                        "leftOperand": "https://w3id.org/edc/v0.0.1/ns/timeInterval",
                        "rightOperand": {
                            "@type": "xsd:date",
                            "@value": policy_time_interval_start_date
                        },
                        "operator": {
                            "@id": "odrl:gteq"
                        }
                    },
                    {
                        "@type": "AtomicConstraint",
                        "odrl:leftOperand": "https://w3id.org/edc/v0.0.1/ns/timeInterval",
                        "rightOperand": {
                            "@type": "xsd:date",
                            "@value": policy_time_interval_end_date
                        },
                        "operator": {
                            "@id": "odrl:lteq"
                        }
                    }
                ]
            }
        ]
        policy_metadata["policy"]["permission"].append(permission_metadata)

    return policy_metadata


def generate_policy_metadata_without_restrictions(policy_id):

    policy_metadata = {
        "@context": {
            "edc": "https://w3id.org/edc/v0.0.1/ns/",
            "odrl": "http://www.w3.org/ns/odrl/2/"
        },
        "@id": policy_id,
        "@type": "edc:PolicyDefinition",
        "edc:policy": {
            "@type": "odrl:Set",
            "odrl:permission": [],
            "odrl:prohibition": [],
            "odrl:obligation": []
        }
    }
    print (type(policy_metadata))

    return policy_metadata
