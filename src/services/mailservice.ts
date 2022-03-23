import { Inject, Service } from "typedi";

@Service()
export default class MailService {
    constructor(
        @Inject('emailClient') private emailClient,
    ){ }
        
    public async SendWelcomeEmail(email){
        /**
         * @TODO Call Mailchimp/Sendgrid or whatever
         */
        // Added example for sending mail from mailgun
        const data = {
            from: 'Excited User <welcome@coinark.org>',
            to: [email],
            subject: 'Hello',
            text: 'Testing some mail service awesomness!'
        };

        try {
            this.emailClient.sendMail(data);
            return { delivered: 1, status: 'ok' };
        } catch(e) {
            return  { delivered: 0, status: 'error' };
        }
    }
}