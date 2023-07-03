import json
import boto3
import contentful

# Function to help get parameters from parameter store;


def get_parameter(parameter_name):
    ssm_client = boto3.client('ssm')
    response = ssm_client.get_parameter(
        Name=parameter_name
    )
    return response['Parameter']['Value']


s3 = boto3.client('s3')
space_id = get_parameter("/contentful/spaceId")
access_token = get_parameter("/contentful/deliveryapikey")
client = contentful.Client(space_id, access_token)

# Fetch data from Contentful
entries = client.entries()
assets = client.assets()

# Prepare data for upload to S3
data = []
for entry in entries:
    data.append(entry.raw)
for asset in assets:
    data.append(asset.raw)
# Specify the file path where you want to write the JSON data
file_path = "../_spa/public/content.json"

# filter out information that we dont want to expose.
filtered_array = []
for item in data:
    new_item = item.copy()
    del item["sys"]["space"]
    del item["sys"]["environment"]
    del item["sys"]["createdAt"]
    del item["sys"]["revision"]
    filtered_array.append(new_item)
# Write data to the file
with open(file_path, "w") as file:
    json.dump(filtered_array, file)
