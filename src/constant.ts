import { oneDark } from '@codemirror/theme-one-dark';
import { monokai } from '@uiw/codemirror-theme-monokai';
import { andromeda } from '@uiw/codemirror-theme-andromeda';
import {
  dracula,
  cobalt,
  tomorrow,
  coolGlow,
  solarizedLight,
  espresso,
  birdsOfParadise
} from 'thememirror';
import conf from './conf/conf';

export const saltRounds = 10
export const VERIFY_EMAIL = 'VERIFY_EMAIL'
export const RESET_PASSWORD = 'RESET_PASSWORD'
export const technologyEnums = [
  'DSA',
  'library',
  'Database',
  'framework',
  'query language',
  'World Wide Web',
  'coding language',
  'Runtime Environment',
  'Backend As a Service',
  'Version Control System',
  "Containerization Platform",
]


export const CODE_SNIPPETS = {
  css: `*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  }
  li{
  list-style-position: inside;
  }

  html,body{
  width : 100%;
  height: 100%;
  overflow-x:hidden;
  }
  `,
  javascript: `console.log("Hello Hamza")`,
  typescript: `console.log("Hello Hamza")`,
  python: `print("Hello Hamza")`,
  java: `public static void main(string[] args){
    System.out.println("Hello World");
  }`,
  html: `<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>

      <h1>Hello World</h1>

    </body>
</html>`
};

export const CSP = `
<meta http-equiv="Content-Security-Policy" content="
  default-src 'none';
  script-src * 'unsafe-inline' 'unsafe-eval';
  style-src * 'unsafe-inline';
  img-src * data: blob:;
  connect-src *;
  font-src *;
  media-src *;
  frame-src *;
  base-uri 'none';
  form-action *;
  ">
`


export const Themes = {
  monokai: monokai,
  andromeda: andromeda,
  oneDark: oneDark,
  dracula: dracula,
  cobalt: cobalt,
  coolGlow: coolGlow,
  solarizedLight: solarizedLight,
  tomorrow: tomorrow,
  espresso: espresso,
  birdsOfParadise: birdsOfParadise
}


export const template = {
  resetPassword: (link: string) => `<html>
                <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                        <tr>
                            <td style="padding: 20px; text-align: center; background-color: #0044cc; color: #ffffff;">
                                <h1 style="margin: 0; font-size: 24px;">Password Reset Request</h1>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px; text-align: center;">
                                <p style="font-size: 16px; color: #333333;">Click the button below to reset your password. If you did not request this password reset, please ignore this email.</p>
                                <a href="${link}" style="display: inline-block; padding: 15px 25px; font-size: 16px; color: #ffffff; background-color: #28a745; text-decoration: none; border-radius: 5px; margin-top: 20px;">here</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 20px; text-align: center; background-color: #f4f4f4;">
                                <p style="font-size: 14px; color: #777777; margin: 0;">Also you can click here ,  <a href="mailto:${conf.mail_user}" style="color: #0044cc;">${link}</a></p>
                            </td>
                        </tr>
                    </table>
                </body>
    </html>`,
  verifyEmail: (link: string) => `
<html>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;"
    >
      <tr>
        <td
          style="padding: 20px; text-align: center; background-color: #0044cc; color: #ffffff;"
        >
          <h1 style="margin: 0; font-size: 24px;">
            Verify Your Email
          </h1>
        </td>
      </tr>

      <tr>
        <td style="padding: 30px; text-align: center;">
          <p style="font-size: 16px; color: #333333; margin-bottom: 20px;">
            Thank you for signing up. Please verify your email address by clicking the button below.
          </p>

          <a
            href="${link}"
            style="
              display: inline-block;
              padding: 14px 28px;
              font-size: 16px;
              color: #ffffff;
              background-color: #28a745;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            "
          >
            Verify Email
          </a>

          <p style="font-size: 14px; color: #777777; margin-top: 30px;">
            If you did not create an account, you can safely ignore this email.
          </p>
        </td>
      </tr>

      <tr>
        <td
          style="
            padding: 20px;
            text-align: center;
            background-color: #f4f4f4;
            font-size: 13px;
            color: #777777;
          "
        >
          <p style="margin-bottom: 10px;">
            If the button does not work, copy and paste this link into your browser:
          </p>

          <a
            href="${link}"
            style="color: #0044cc; word-break: break-all;"
          >
            ${link}
          </a>
        </td>
      </tr>
    </table>
  </body>
</html>
`
}