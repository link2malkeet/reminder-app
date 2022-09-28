import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import "source-map-support/register";
import { formatJSONResponse } from "../../libs/apiGateway";
import DBRepository from "../../libs/dynamodb";
import schema from "./schema";
const dbClient = new DBRepository(process.env.REMINDER_TABLE);
const getReminder: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const { userId } = event.pathParameters || {};
  if(!userId) {
    return formatJSONResponse({
      statusCode: 400,
      data: { message: "missing userId in path" },
    });
  }
  try {
    const data = await dbClient.query(userId);
    console.log('data:', data);
    return formatJSONResponse({
      data,
    });
  } catch (err) {
    console.log("err:", err);
  }
};

export const main = middyfy(getReminder);
