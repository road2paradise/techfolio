import boto3
import json
import requests
import contentful

## Function to help get parameters from parameter store;
def get_parameter(parameter_name):
    ssm_client = boto3.client('ssm')
    response = ssm_client.get_parameter(
        Name=parameter_name
    )
    return response['Parameter']['Value']
    
# def lambda_handler(event, context):
    
space_id = get_parameter("/contentful/spaceId")
access_token = get_parameter("/contentful/deliveryapikey")
client = contentful.Client(space_id, access_token)

# Fetch data from Contentful
entries = client.entries()

# Prepare data for upload to S3
data = []

for entry in entries:
    data.append(entry.raw)

print(json.dumps(data))
# for entry in entries:
#     data.append({
#         'id': entry.id,
#         'content': entry.fields
#     }),
    # return {
    #     'statusCode': 200,
    #     'body': json.dumps('Hello from Lambda!')
    # }