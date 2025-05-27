export async function POST(request: Request) {

  const requestBody = await request.json();
  console.log(requestBody)

  const policyId = requestBody.policyId;
  console.log(policyId)

  const payload = {
    "@context": {
      "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
    },
    "@type": "https://w3id.org/edc/v0.0.1/ns/ContractRequest",
    "counterPartyAddress": `http://${process.env.PROVIDER_URL}:9194/protocol`,
    "protocol": "dataspace-protocol-http",
    "policy": {
      "@context": "http://www.w3.org/ns/odrl.jsonld",
      "@type": "odrl:Offer",
      "@id": policyId,
      "assigner": `${process.env.PROVIDER_ASSIGNER}`,
      "permission": [],
      "prohibition": [],
      "obligation": [],
      "target": `http://${process.env['ASSET_ID_1']}:9194/protocol`
    }
  }

  const response = await fetch(`http://${process.env.CONSUMER_URL}:9193/management/v3/contractnegotiations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.X_API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  return response


}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const contractNegotiationId = searchParams.get('contract-negotiation-id')
  const response = await fetch(`http://${process.env.CONSUMER_URL}:9193/management/v3/contractnegotiations/${contractNegotiationId}`, {
    method: 'GET', // Cambia el método a POST
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.X_API_KEY}`
    }
  });

  return response
}
