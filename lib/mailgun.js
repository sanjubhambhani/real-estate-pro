const Mailgun = require("mailgun.js")
const mailgun = new Mailgun(FormData)

import getConfig from "next/config"
const { serverRuntimeConfig } = getConfig()
const { MAILGUN_API_KEY } = serverRuntimeConfig

export const sendMail = async (data) => {
  if (!MAILGUN_API_KEY) return null

  const mg = mailgun.client({ username: "api", key: MAILGUN_API_KEY })
  mg.messages
    .create("sanjub.com", {
      from: `noreply@sanjub.com`,
      to: data.to,
      subject: data.subject,
      text: data.text,
    })
    .then((response) => {})
    .catch((err) => {
      console.log(err)
    })
}
