import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import "source-map-support/register";
import { v4 as uuid } from "uuid";
import DBRepository from "../../libs/dynamodb";
import schema from "./schema";
const dbClient = new DBRepository(process.env.REMINDER_TABLE);
const setReminder: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const body = event.body;
  console.log("event.body:", event.body);
  const { email, phoneNumber, reminderDate } = body;
  const date = new Date(reminderDate * 1000);
  const formattedDateTime = date.toLocaleString("en-AU", {
    timeZone: "Australia/Sydney",
  });
  const data = {
    ...body,
    id: uuid(),
    TTL: reminderDate,
    userId: email || phoneNumber,
    reminderDate: formattedDateTime,
  };
  console.log("data:", data);
  try {
    await dbClient.put(data);
    return formatJSONResponse({
      message: `Reminder is set for ${formattedDateTime}`,
      id: data.id,
    });
  } catch (err) {
    return formatJSONResponse({
      statusCode: 502,
      data: {
        message: err.message,
      },
    });
  }
};

export const main = middyfy(setReminder);
