import nodemailer from 'nodemailer';


export class EmailService {
    static async SendVerificationCode(email: string, code: number): Promise<boolean> {
        try {
            let result: boolean
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                service: 'gmail',
                auth: {
                    user: '21akr.xx@gmail.com',
                    pass: 'hucn mzcl lvzv cwxs'
                }
            })
            const sent = await transporter.sendMail({
                from: 'mohir7209@gmail.com',
                to: email,
                subject: 'Verification Code',
                html: `<H2> // </H2>   <p>${code}</p>`
            })

            result = !!sent
            transporter.close()
            return result
        } catch (error) {
            console.log(error)
            return false
        }
    }

}
