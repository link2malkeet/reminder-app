import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  PutCommand,
  PutCommandInput,
  QueryCommandInput,
  QueryCommand
} from "@aws-sdk/lib-dynamodb";

export default class DBRepository {
  private dynamoClient: DynamoDBClient;
  private tableName;
  constructor(tableName) {
    this.dynamoClient = new DynamoDBClient({});
    this.tableName = tableName;
  }
  public async put(data: Record<string, any>) {
    const params: PutCommandInput = {
      TableName: this.tableName,
      Item: data,
    };
    const command = new PutCommand(params);
    await this.dynamoClient.send(command);
    return data;
  }
  public async query(value: string) {
    const params: QueryCommandInput = {
      TableName: this.tableName,
      IndexName: "index1",
      KeyConditionExpression: `userId = :userId`,
      ExpressionAttributeValues: {
        ":userId": value,
      },
    };
    const command = new QueryCommand(params);
    const res = await this.dynamoClient.send(command);
    console.log('res:', res);
    return res.Items;
  }
}
