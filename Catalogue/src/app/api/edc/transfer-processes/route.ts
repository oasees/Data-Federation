export async function POST(request: Request) {
  const requestBody = await request.json();
  console.log(requestBody)

  const agreementId = requestBody.agreementId;
  console.log(agreementId)

  const payload = {
    "@context": {
      "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
    },
    "@type": "TransferRequestDto",
    "connectorId": `${process.env.PROVIDER_ASSIGNER}`,
    "counterPartyAddress":  `http://${process.env.PROVIDER_URL}:9194/protocol`,
    "contractId": agreementId,
   // "assetId": `${process.env['ASSET_ID_1']}`,
    "assetId": `${process.env[`ASSET_ID_${requestBody.slug}`]}`,
    "protocol": "dataspace-protocol-http",
    "transferType": "HttpData-PULL"
  }
  

  console.log(payload)

  const response = await fetch(`http://${process.env.CONSUMER_URL}:9193/management/v3/transferprocesses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.X_API_KEY}`
    },
    body: JSON.stringify(payload)
  });


  return response
}