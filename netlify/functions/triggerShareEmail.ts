import { Handler } from "@netlify/functions";
import validator from "validator";
import fetch from "node-fetch";

interface Post {
  title: string;
  link: string;
  authors: Array<string>
}

interface RequestBody {
  userEmail: string;
  message?: string;
  targetEmails: Array<string>;
  posts: Array<Post>;
}

interface ValidationError {
  field: string;
  message: string;
}

const validateRequestBody = function (requestBody: RequestBody) {
  let errors: Array<ValidationError> = []

  // Validate user email
  if (!validator.isEmail(requestBody.userEmail)) {
    errors.push({ field: "userEmail", message: "Invalid user Email" } as ValidationError)
  }

  // Validate there are recipients
  if (requestBody.targetEmails.length === 0) {
    errors.push({ field: "targetEmails", message: "No recipients found" } as ValidationError)
  }

  // Validate there aren't too many recipients
  if (requestBody.targetEmails.length > 5) {
    errors.push({ field: "targetEmails", message: "Too many recipients" } as ValidationError)
  }

  // Validate recipient emails
  for (let i = 0; i < requestBody.targetEmails.length; i++) {
    const email = requestBody.targetEmails[i]
    if (!validator.isEmail(email)) {
      errors.push({ field: "targetEmails", message: "Invalid target email" } as ValidationError)
      break;
    }
  }

  // Validate message isn't too long
  if (!validator.isLength(requestBody.message, { min: 0, max: 500 })) {
    errors.push({ field: "message", message: "Message over character limit" } as ValidationError)
  }

  // Validate posts are present and contain the right fields
  if (requestBody.posts.length === 0) {
    errors.push({ field: "posts", message: "No posts found" } as ValidationError)
  }
  for (let i = 0; i < requestBody.posts.length; i++) {
    const p = requestBody.posts[i]
    if (!validator.isURL(p.link)) {
      errors.push({ field: "posts", message: "Invalid post (Bad URL)" } as ValidationError)
      break;
    }
    if (validator.isEmpty(p.title)) {
      errors.push({ field: "posts", message: "Invalid post" } as ValidationError)
      break;
    }
  }

  return errors;
}

const handler: Handler = async function (event) {
  if (event.body === null) {
    return {
      statusCode: 400,
      body: JSON.stringify("Payload required"),
    };
  }

  const requestBody = JSON.parse(event.body) as RequestBody
  const errors = validateRequestBody(requestBody);

  if (errors.length === 0) {
    const userEmail = validator.normalizeEmail(requestBody.userEmail)
    const targetEmails = requestBody.targetEmails.map(email => {
      return validator.normalizeEmail(email)
    })
    const message = validator.escape(requestBody.message)
    // const res = await fetch(`${process.env.URL}/.netlify/functions/emails/share`, {
    //   headers: {
    //     "netlify-emails-secret": process.env.NETLIFY_EMAILS_SECRET as string,
    //   },
    //   method: "POST",
    //   body: JSON.stringify({
    //     from: process.env.EMAIL_SENDER,
    //     to: targetEmails,
    //     replyTo: userEmail,
    //     subject: `${userEmail} hat ${requestBody.posts.length} Artikel mit dir geteilt`,
    //     parameters: {
    //       userEmail: requestBody.userEmail,
    //       targetEmails: requestBody.targetEmails,
    //       message: message,
    //       posts: requestBody.posts,
    //     },
    //   }),
    // });

    // Todo: React properly here if Sendgrid returns an error

    return {
      statusCode: 200,
      body: JSON.stringify("Subscribe email sent!"),
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify(errors),
    };
  }



};

export { handler };

