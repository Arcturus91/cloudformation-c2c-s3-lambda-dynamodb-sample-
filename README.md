# cloudformation-c2c-s3-lambda-dynamodb-sample-

# C2C Articles Processing

This project implements a serverless application using AWS SAM (Serverless Application Model) to process articles for a C2C (Customer-to-Customer) platform. It uses AWS S3 for storage, AWS Lambda for processing, and Amazon DynamoDB for data persistence.

## Architecture

The application consists of the following AWS resources:

1. S3 Bucket: Stores the article files
2. Lambda Function: Processes new articles added to the S3 bucket
3. DynamoDB Table: Stores metadata about processed articles

## Prerequisites

- AWS CLI installed and configured
- AWS SAM CLI installed
- Node.js and npm installed

## Setup

1. Clone this repository:

   ```
   git clone <repository-url>
   cd c2c-articles-processing
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Deploy the application:

   ```
   sam build
   sam deploy --config-env prod
   ```

4. After deployment, manually configure the S3 trigger for the Lambda function in the AWS Console:

   - Go to the S3 console and select the `c2c-articles` bucket
   - Navigate to the Properties tab and find the Event Notifications section
   - Create a new event notification:
     - Event type: All object create events
     - Destination: Lambda function
     - Lambda function: Select the deployed C2CArticlesProcessorFunction

5. Upload the `uuid` package as a Lambda layer or include it in your deployment package:
   - Option 1: Create a Lambda layer with the `uuid` package and attach it to your function
   - Option 2: Include `uuid` in your `package.json` and deploy it with your function code

## Usage

To use the application:

1. Upload an article file to the `c2c-articles` S3 bucket
2. The Lambda function will automatically process the new file
3. Article metadata will be stored in the DynamoDB table

## File Structure

- `template.yaml`: SAM template defining AWS resources
- `samconfig.toml`: SAM CLI configuration file
- `src/main.js`: Lambda function code
- `README.md`: This file

## Development

To modify the application:

1. Edit the `template.yaml` file to change AWS resources
2. Modify `src/main.js` to alter the Lambda function's behavior
3. Update `samconfig.toml` if you need to change deployment configurations

After making changes, redeploy the application using the SAM CLI commands mentioned in the Setup section.

## Notes

- Ensure you have the necessary permissions to create and manage the AWS resources defined in the template
- Remember to delete the stack when you're done to avoid incurring unnecessary AWS charges

## License

[Specify your license here]
