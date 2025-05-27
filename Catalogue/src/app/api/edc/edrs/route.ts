export const dynamic = 'force-dynamic'

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)
  const transferId = searchParams.get('transfer-id')
  
  const response = await fetch(`http://${process.env.CONSUMER_URL}:9193/management/v3/edrs/${transferId}/dataaddress`, {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate' // Evita que se almacene en caché en el cliente, servidor y red

    },
  });

  console.log(response)
  
  return response
}