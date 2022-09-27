import type { AWS } from "@serverless/typescript";

import setReminder from "@functions/setReminder";
import sendReminder from "@functions/sendReminder";
import getReminder from "@functions/getReminder";

const serverlessConfiguration: AWS = {
  service: "reminder-app",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    reminderTable: "${sls:stage}-reminder-table",
  },
  plugins: ["serverless-webpack", "serverless-iam-roles-per-function"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    profile: "link2malkeet",
    region: "ap-southeast-2",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      REMINDER_TABLE: "${self:custom.reminderTable}",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { setReminder, sendReminder, getReminder },
  resources: {
    Resources: {
      reminderTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "${self:custom.reminderTable}",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
            {
              AttributeName: "userId",
              AttributeType: "S",
            },
            {
              AttributeName: "reminderDate",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          BillingMode: "PAY_PER_REQUEST",

          StreamSpecification: {
            StreamViewType: "OLD_IMAGE",
          },

          TimeToLiveSpecification: {
            AttributeName: "TTL",
            Enabled: true,
          },

          GlobalSecondaryIndexes: [
            {
              IndexName: "index1",
              KeySchema: [
                {
                  AttributeName: "userId",
                  KeyType: "HASH",
                },
                {
                  AttributeName: "reminderDate",
                  KeyType: "RANGE",
                },
              ],
              Projection: {
                ProjectionType: "ALL",
              },
            },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
