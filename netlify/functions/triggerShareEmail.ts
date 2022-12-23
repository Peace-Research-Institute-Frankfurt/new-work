import { Handler } from "@netlify/functions";
import fetch from "node-fetch";

const handler: Handler = async function (event) {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }

  const requestBody = JSON.parse(event.body) as {
    userEmail: string;
    message: string;
    targetEmails: Array<string>;
    posts: Array<object>;
  };

  console.log("Called email handler")
  console.log(requestBody)
  await fetch(`${process.env.URL}/.netlify/functions/emails/share`, {
    headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET as string,
    },
    method: "POST",
    body: JSON.stringify({
      from: process.env.EMAIL_SENDER,
      to: requestBody.targetEmails,
      replyTo: requestBody.userEmail,
      subject: `${requestBody.userEmail} hat ${requestBody.posts.length} Artikel mit dir geteilt`,
      parameters: {
        userEmail: requestBody.userEmail,
        targetEmails: requestBody.targetEmails,
        message: requestBody.message,
        posts: requestBody.posts,
      },
    }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify("Subscribe email sent!"),
  };
};

export { handler };

