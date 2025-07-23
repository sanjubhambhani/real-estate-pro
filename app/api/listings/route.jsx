import { getListings } from "lib/notion"

const filterStatus = {
  property: "Status",
  status: { equals: "Active" },
}

export async function GET(request) {
  const response = await getListings(filterStatus)
  return new Response(JSON.stringify(response), {
    headers: { "content-type": "application/json" },
  })
}
