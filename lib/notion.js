import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export const getListings = async (filter = null) => {
  let payload = { database_id: process.env.NOTION_DB_LISTINGS }
  if (filter) payload.filter = filter
  const response = await notion.databases.query(payload)
  return response.results
}

export const getLeads = async (filter = null) => {
  let payload = { database_id: process.env.NOTION_DB_LEADS }
  if (filter) payload.filter = filter
  const response = await notion.databases.query(payload)
  return response.results
}

export const getPage = async (pageID = null) => {
  const response = await notion.pages.retrieve({ page_id: pageID })
  return response
}

export const createPage = async (payload) => {
  const response = await notion.pages.create(payload)
  return response
}

export const getPropertyValue = (item, property) => {
  if (!item.properties || !item.properties[property]) return null
  const prop = item.properties[property]
  // console.log(prop)
  switch (prop.type) {
    case "number":
      return prop.number
    case "rich_text":
      return prop.rich_text[0]?.plain_text || null
    case "title":
      return prop.title[0]?.plain_text || null
    case "select":
      return prop.select.name
    case "url":
      return prop.url || null
    case "files":
      return prop.files[0]?.file?.url || null
    // Add more cases for other Notion property types if needed
    default:
      return null
  }
}
