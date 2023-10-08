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
    assets = client.assets()

    # Prepare data for upload to S3
    data = []
    for entry in entries:
        data.append(entry.raw)
    for asset in assets:
        data.append(asset.raw)

    bucket_name = 'techfolio'
    file_name = 'content.json'

    filtered_array = []
    for item in data:
        new_item = item.copy()
        del item["sys"]["space"]
        del item["sys"]["environment"]
        del item["sys"]["createdAt"]
        del item["sys"]["revision"]
        filtered_array.append(new_item)

    s3.put_object(
        Body=json.dumps(filtered_array),
        Bucket=bucket_name,
        Key=file_name
    )

    return {
        'statusCode': 200,
        'body': 'Data uploaded to S3 successfully'
    }
