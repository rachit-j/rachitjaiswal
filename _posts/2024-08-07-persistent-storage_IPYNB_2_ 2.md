---
layout: post
title: S3 Persistent Storage
description: "A historical guide to configuring S3-backed persistent storage for Kasm profiles."
tags:
  - KasmV2
  - AWS
  - Developer
project_tag: kasmv2

excerpt: >-
  A historical guide to configuring S3-backed persistent storage for Kasm profiles.
archive_notice: true
nav: notebook
---

<p>Guide on how to configure S3 for persistent storage configuration.</p>

<h2>Step 1: Create a bucket</h2>

<p>Go to AWS S3 and create a bucket.</p>

<h2>Step 2: Define AWS access and secret keys</h2>

<p>The administrator needs to define the AWS Access Key ID and Access Secret in the Server Settings of Kasm.</p>

<h2>Step 3: Configure the persistent profile path in the workspace image</h2>

<p>See Persistent Profile guide, just change the path to something like this:</p>


```python
s3://<your-bucket>/<generic-image>/{user}/
```

<p>This will store the profile in the S3 bucket.</p>

<h2>Step 4: Make sure to change the bucket policy</h2>


```python
json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PolicyForAllowKasmS3UserReadWrite",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<some arn number>:user/jm1021"
            },
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::kasm-profile/*"
        },
        {
            "Sid": "PolicyForAllowKasmS3UserListLocate",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::<some arn number>:user/jm1021"
            },
            "Action": [
                "s3:ListBucket",
                "s3:GetBucketLocation"
            ],
            "Resource": "arn:aws:s3:::kasm-profile"
        }
    ]
}
```
