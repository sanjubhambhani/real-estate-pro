const Mailgun = require("mailgun.js")
const mailgun = new Mailgun(FormData)

import getConfig from "next/config"
const { serverRuntimeConfig } = getConfig()
const { MAILGUN_API_KEY } = serverRuntimeConfig

export const sendMail = async (data) => {
  console.log("send-email", MAILGUN_API_KEY)

  if (!MAILGUN_API_KEY) return null

  console.log("send-email:yes")

  const { to, subject, text } = data

  const mg = mailgun.client({ username: "api", key: MAILGUN_API_KEY })
  await mg.messages
    .create("sanjub.com", {
      from: `noreply@sanjub.com`,
      to: to,
      subject: subject,
      text: text,
    })
    .then((response) => {
      console.log("send-email:response")
      console.log(response)
    })
    .catch((err) => {
      console.log("send-email:err")
      console.log(err)
    })
}
