import boto3
import json
import contentful

# Function to help get parameters from parameter store;


def get_parameter(parameter_name):
    ssm_client = boto3.client('ssm')
    response = ssm_client.get_parameter(
        Name=parameter_name
    )
    return response['Parameter']['Value']


def lambda_handler(event, context):
    space_id = get_parameter("/contentful/spaceId")
    access_token = get_parameter("/contentful/deliveryapikey")
    client = contentful.Client(space_id, access_token)
    s3 = boto3.client('s3')

    # Fetch data from Contentful
    entries = client.entries()

    # Prepare data for upload to S3
    data = []

    for entry in entries:
        data.append(entry.raw)

    # Specify the file path where you want to write the JSON data
    # Upload data to S3 bucket
    bucket_name = 'techfolio'
    file_name = 'content.json'

    s3.put_object(
        Body=json.dumps(data),
        Bucket=bucket_name,
        Key=file_name
    )

    return {
        'statusCode': 200,
        'body': 'Data uploaded to S3 successfully'
    }
