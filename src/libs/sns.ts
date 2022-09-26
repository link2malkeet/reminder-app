import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";

export class SNSRepository {
  private snsClient;
  constructor() {
    this.snsClient = new SNSClient({});
  }

  public async send({
    phoneNumber,
    reminder,
  }: {
    phoneNumber: string;
    reminder: string;
  }) {
    const command = new PublishCommand({
      Message: reminder,
      PhoneNumber: phoneNumber,
    });
    const res = await this.snsClient.send(command);
    console.log(res);
    return res.MessageId;
  }
}
