import * as nodemailer from 'nodemailer';


export class EmailService {
  static async SendVerificationCode(username: string, email: string, password: string): Promise<boolean> {
    try {
      let result: boolean;
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
          user: '21akr.xx@gmail.com',
          pass: 'nbak zbic htmx jmob',
        },
      });
      const sent = await transporter.sendMail({
        from: '21akr.xx@gmail.com',
        to: email,
        subject: 'Account Successfully Created',
        html: `
    <div style="font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #4CAF50; color: white; padding: 15px; text-align: center;">
          <h1 style="margin: 0;">Account Created Successfully!</h1>
        </div>
        <div style="padding: 20px;">
          <h2 style="color: #4CAF50;">${username}, Welcome to Our Platform!</h2>
          <p>We're excited to have you on board. Below are your login credentials:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px; background-color: #f9f9f9; font-weight: bold;">Login Email:</td>
              <td style="padding: 10px; background-color: #f9f9f9;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; background-color: #f1f1f1; font-weight: bold;">Password:</td>
              <td style="padding: 10px; background-color: #f1f1f1;">${password}</td>
            </tr>
          </table>
          <p style="margin-top: 20px;">We recommend you change your password after logging in for the first time.</p>
        </div>
        <div style="background-color: #f1f1f1; text-align: center; padding: 10px; color: #666;">
          <p>Thank you for choosing us!</p>
          <p>&copy; 2024 Our Company. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  `,
      });


      result = !!sent;
      transporter.close();
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
