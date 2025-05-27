export async function POST(request: Request) {
  const requestBody = await request.json();
  console.log("dfkldsjflkdjslkfjsdl")
  console.log(requestBody)


  const payload = 
  {
    "@context": { "@vocab": "https://w3id.org/edc/v0.0.1/ns/" },
    "@type": "DatasetRequest",
    "@id": `${process.env[`ASSET_ID_${requestBody.slug}`]}`,
   //"@id": "blade_acoustic_monitoring_swarm_system_technicalReport",
    "counterPartyAddress": `http://${process.env.PROVIDER_URL}:9194/protocol`,
    "protocol": "dataspace-protocol-http"
  }
  console.log(payload)

  const response = await fetch(`http://${process.env.CONSUMER_URL}:9193/management/v3/catalog/dataset/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.X_API_KEY}`
    },
    body: JSON.stringify(payload)
  });

  return response

}