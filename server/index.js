require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, number, message } = req.body;
    if (!name || !email || !subject || !number || !message) {
      return res.status(400).send('Please complete the form and try again.');
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `${name} <${email}>`,
      to: process.env.CONTACT_TO || 'you@example.com',
      subject: `New contact from ${subject}`,
      text: `Name: ${name}\nSubject: ${subject}\nEmail: ${email}\nNumber: ${number}\n\nMessage:\n${message}`,
    });

    res.status(200).send('Thank You! Your message has been sent.');
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Oops! Something went wrong and we couldn't send your message.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
