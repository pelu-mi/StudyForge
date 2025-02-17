/**
 * Import Modules
 */
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send scheduled email
const sendScheduledMail = (payload) => {
  const textMail = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333333;
      font-size: 24px;
      margin-bottom: 20px;
    }
    p {
      color: #777777;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>TIME TO STUDY</h1>
    <p>Get one more study session in and take a step towards your learning goals</p>
  </div>
</body>
</html>
`;
  const msg = {
    to: payload.to,
    from: {
      name: "Study Forge",
      email: "aimuelemmanuel@gmail.com",
    },
    subject: payload.subject,
    html: textMail,
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(`Email sent to ${payload.to}`);
      console.log(response[0].statusCode);
      //console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });
};

/**
 * Export function
 */
export default { sendScheduledMail };
