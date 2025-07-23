import { getPage } from "lib/notion"

export async function GET(request, { params }) {
  const { id } = await params
  const listing = await getPage(id)
  return new Response(JSON.stringify(listing), {
    headers: { "content-type": "application/json" },
  })
}
