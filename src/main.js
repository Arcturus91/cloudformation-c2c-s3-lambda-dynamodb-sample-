const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

const dynamoDbClient = new DynamoDBClient({ region: process.env.REGION });
const docClient = DynamoDBDocumentClient.from(dynamoDbClient);

exports.handler = async (event) => {
  try {
    for (const record of event.Records) {
      const bucket = record.s3.bucket.name;
      const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, " "));
      const articleId = uuidv4();
      const objectUrl = `https://${bucket}.s3.${process.env.REGION}.amazonaws.com/${key}`;

      const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Item: {
          articleId: articleId,
          objectUrl: objectUrl,
        },
      };

      await docClient.send(new PutCommand(params));
      console.log(`Processed article: ${articleId}, URL: ${objectUrl}`);
    }

    return { statusCode: 200, body: "Processing complete" };
  } catch (error) {
    console.error("Error:", error);
    return { statusCode: 500, body: "Error processing articles" };
  }
};
