import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import "source-map-support/register";
import schema from "./schema";

const setReminder: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  return formatJSONResponse({
    message: `Hello ${event.body.email}, welcome to the exciting Serverless world!`,
  });
};

export const main = middyfy(setReminder);
