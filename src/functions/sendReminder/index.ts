import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      stream: {
        type: "dynamodb",
        arn: {
          "Fn::GetAtt": ["reminderTable", "StreamArn"],
        },
        filterPatterns: [{ eventName: ["REMOVE"] }],
      },
    },
  ],
  iamRoleStatements: [
    {
      Effect: "Allow",
        Action: ["ses:sendEmail", "sns:Publish"],
        Resource: "*",
    },
  ],
};
