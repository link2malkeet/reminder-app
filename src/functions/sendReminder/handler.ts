import { unmarshall } from "@aws-sdk/util-dynamodb";
import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { DynamoDBStreamEvent } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import "source-map-support/register";
import { SESRepository } from '../../libs/ses';

const sesClient = new SESRepository();
const setReminder = async (event: DynamoDBStreamEvent) => {
  event.Records.map(async (record) => {
    const data = unmarshall(
      record.dynamodb.OldImage as Record<string, AttributeValue>
    );
    console.log("data", data);
    const {email, reminder} = data;
    await sesClient.send({email, reminder})
    console.log("email reminder sent");
  });
};

export const main = middyfy(setReminder);
