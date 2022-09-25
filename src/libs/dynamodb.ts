import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb";

export default class DBRepository {
  private dynamoClient;
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
}
