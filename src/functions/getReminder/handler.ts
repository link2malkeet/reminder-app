import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import "source-map-support/register";
import schema from "./schema";
import DBRepository from "../../libs/dynamodb";
import { formatJSONResponse } from "../../libs/apiGateway";
import { unmarshall } from "@aws-sdk/util-dynamodb";
const dbClient = new DBRepository(process.env.REMINDER_TABLE);
const getReminder: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const body = event.body;
  console.log("event.body:", event.body);
  const { userId } = body;
  try {
    const data = await dbClient.query(userId);
    return formatJSONResponse({
      data: data.Items?.map((item) => unmarshall(item)) || [],
    });
  } catch (err) {
    console.log("err:", err);
  }
};

export const main = middyfy(getReminder);
