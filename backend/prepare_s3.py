import json
import boto3
from concert_platform.settings import S3_ACCESS_KEY, S3_SECRET_KEY, S3_ENDPOINT, S3_BUCKET

if __name__ == '__main__':
    s3 = boto3.client(
        's3',
        endpoint_url=S3_ENDPOINT,
        aws_access_key_id=S3_ACCESS_KEY,
        aws_secret_access_key=S3_SECRET_KEY
    )
    try:
        s3.create_bucket(Bucket=S3_BUCKET, ACL='public-read')
    except s3.exceptions.BucketAlreadyExists:
        print('Bucket exists')
    s3.put_bucket_policy(Bucket=S3_BUCKET, Policy=json.dumps({
        'Version': '2021-10-17',
        'Statement': [{
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::{}".format(S3_BUCKET)
        }]
    }))