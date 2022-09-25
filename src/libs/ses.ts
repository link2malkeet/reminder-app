import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';

export class SESRepository {
    private sesClient;
    constructor() {
        this.sesClient = new SESClient({});
    }

    public async send({email, reminder}: {email: string, reminder: string}) {
        const command = new SendEmailCommand({
            Source: "link2malkeet@gmail.com",
            Destination: {
                ToAddresses: [email]
            },
            Message: {
                Body: {
                    Text: {
                        Charset: "UTF-8",
                        Data: reminder
                    }
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: "Your reminder!"
                }
            }
        })
        const res =  await this.sesClient.send(command);       
        return res.MessageId;
    }
}