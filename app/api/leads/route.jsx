import { NextResponse } from "next/server"

import { getLeads, createPage } from "lib/notion"
import connectDB from "lib/mongodb"
import Agent from "models/agent"

import getConfig from "next/config"
const { serverRuntimeConfig } = getConfig()
const { NOTION_DB_LEADS } = serverRuntimeConfig

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const agentID = searchParams.get("agent")
  const filterAgent = {
    property: "Agent ID",
    rich_text: { equals: agentID },
  }
  const response = await getLeads(filterAgent)
  return NextResponse.json(response)
}

export async function POST(request) {
  const values = await request.json()

  let agentID = ""
  let agentName = ""
  if (values.agent) {
    await connectDB()
    const agent = await Agent.findOne({ _id: values.agent })
    agentID = agent._id.toString()
    agentName = agent.name
  }

  const payload = {
    parent: {
      type: "database_id",
      database_id: NOTION_DB_LEADS,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: values.name,
            },
          },
        ],
      },
      "Email Address": {
        rich_text: [
          {
            text: {
              content: values.email,
            },
          },
        ],
      },
      "Phone Number": {
        rich_text: [
          {
            text: {
              content: values.phone,
            },
          },
        ],
      },
      "Number of Occupants": {
        rich_text: [
          {
            text: {
              content: values.occupants,
            },
          },
        ],
      },
      "Short Term or Long Term?": {
        rich_text: [
          {
            text: {
              content: values.term,
            },
          },
        ],
      },
      "Household Salary Range": {
        rich_text: [
          {
            text: {
              content: values.salary_range,
            },
          },
        ],
      },
      "Credit Score": {
        rich_text: [
          {
            text: {
              content: values.credit_score,
            },
          },
        ],
      },
      "Why are you moving from your current place and When are you looking to move in?":
        {
          rich_text: [
            {
              text: {
                content: values.reason,
              },
            },
          ],
        },
      "Current Status in Canada": {
        rich_text: [
          {
            text: {
              content: values.current_status,
            },
          },
        ],
      },
      "When are you available to view the property?": {
        rich_text: [
          {
            text: {
              content: values.available,
            },
          },
        ],
      },
      "Property Address / Neighbourhood": {
        rich_text: [
          {
            text: {
              content: values.neighbourhood,
            },
          },
        ],
      },
      "Agent ID": {
        rich_text: [
          {
            text: {
              content: agentID || "",
            },
          },
        ],
      },
      "Agent Name": {
        rich_text: [
          {
            text: {
              content: agentName || "",
            },
          },
        ],
      },
    },
  }
  const response = await createPage(payload)
  return NextResponse.json(response)
}
