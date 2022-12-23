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
    targetEmails: Array<string>;
    posts: Array<object>;
  };

  //automatically generated snippet from the email preview
  //sends a request to an email handler for a subscribed email
  await fetch(`${process.env.URL}/.netlify/functions/emails/share`, {
    headers: {
      "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET as string,
    },
    method: "POST",
    body: JSON.stringify({
      from: process.env.EMAIL_SENDER,
      to: requestBody.targetEmail,
      replyTo: requestBody.userEmail,
      subject: `${requestBody.userEmail} hat Artikel mit dir geteilt`,
      parameters: {
        name: requestBody.subscriberName,
        email: requestBody.subscriberEmail,
      },
    }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify("Subscribe email sent!"),
  };
};

export { handler };

