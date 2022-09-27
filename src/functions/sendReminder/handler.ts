import { unmarshall } from "@aws-sdk/util-dynamodb";
import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { DynamoDBStreamEvent } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import "source-map-support/register";
import { SESRepository } from "../../libs/ses";
import { SNSRepository } from "../../libs/sns";

const sesClient = new SESRepository();
const snsClient = new SNSRepository();
const setReminder = async (event: DynamoDBStreamEvent) => {
  try {
    const reminderPromises = event.Records.map(async (record) => {
      const data = unmarshall(
        record.dynamodb.OldImage as Record<string, AttributeValue>
      );
      console.log("data", data);
      const { email, reminder, phoneNumber } = data;
      if (email) await sesClient.send({ email, reminder });
      if (phoneNumber) await snsClient.send({ phoneNumber, reminder });
      console.log("email reminder sent");
    });
    await Promise.all(reminderPromises);
  } catch (error) {
    console.log("error", error);
  }
};

export const main = middyfy(setReminder);
