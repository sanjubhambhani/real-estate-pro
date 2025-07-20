import { getLeads } from "../../../lib/notion"

export async function GET(request) {
  const response = await getLeads()
  return new Response(JSON.stringify(response), {
    headers: { "content-type": "application/json" },
  })
}
