// import schema from "./schema";
import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "/{userId}",
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
      Action: "dynamodb:*",
      Resource: [
        "arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.reminderTable}",
        "arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.reminderTable}/index/index1",
      ],
    },
  ],
};
