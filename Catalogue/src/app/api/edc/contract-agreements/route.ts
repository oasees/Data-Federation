export async function POST(request: Request) {
  const requestBody = await request.json();
  console.log(requestBody.slug)

  const payload = {
    "@context": {
        "edc": "https://w3id.org/edc/v0.0.1/ns/"
    },
    "@type": "QuerySpec",
    "limit": 100,
    "sortOrder": "DESC",
    "filterExpression": [
        {
            "operandLeft": "assetId",
            "operandRight": `${process.env[`ASSET_ID_${requestBody.slug}`]}`,
          //  "operandRight": "blade_acoustic_monitoring_swarm_system_technicalReport",
            "operator": "="
        }
    ]
}

  const response = await fetch(`http://${process.env.CONSUMER_URL}:9193/management/v3/contractagreements/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': `${process.env.X_API_KEY}`
    },
    body: JSON.stringify(payload) 
  });

  
  return response
}