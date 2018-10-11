import nodemailer from "nodemailer";
import { Request, Response } from "express";
import { serverUrl } from "../util/secrets";
import { welcomeTemplate } from "../emailTemplates/welcomeTemplate";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mobilecipl@gmail.com",
    pass: "classic@123",
  }
});

/**
 * GET /contact
 * Contact form page.
 */
export let getContact = (req: Request, res: Response) => {
  res.render("contact", {
    title: "Contact"
  });
};

/**
 * POST /contact
 * Send a contact form via Nodemailer.
 */
export let postContact = (token: String, email: string) => {
  const template = welcomeTemplate(token);
  const mailOptions = {
    to: email,
    from: `abhishek@classicinformatics.com`,
    subject: "Contact Form",
    // html: "<p>Click <a href=https://" + serverUrl + "/getVerifyEmail/" + token + ">here</a> to reset your password</p>"
    html: template
  };



  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.log(err);
    }

  });
};
