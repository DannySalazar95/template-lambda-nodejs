import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

export const dynamoDBConnectionClient = () => {
    if (process.env.IS_OFFLINE) {
        return DynamoDBDocumentClient.from(
            new DynamoDBClient({
                endpoint: process.env.DYNAMO_DB_LOCAL_ENDPOINT,
                region: process.env.DYNAMO_DB_LOCAL_AWS_REGION,
                credentials: {
                    accessKeyId: process.env.DYNAMO_DB_LOCAL_ACCESS_KEY_ID,
                    secretAccessKey: process.env.DYNAMO_DB_LOCAL_SECRET_ACCESS_KEY,
                }
            }))
    }
    return DynamoDBDocumentClient.from(
        new DynamoDBClient({
            region: process.env.DYNAMO_DB_REMOTE_AWS_REGION
        }))
};
