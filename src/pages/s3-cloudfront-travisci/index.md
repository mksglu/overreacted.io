---
title: CI/CD S3 and CloudFront with TravisCI
date: '2019-01-01'
spoiler: We'll learn how to deployment when build React app used to S3 and CloudFront with TravisCI.
cta: general
keywords: ["cloudfront","travisci","aws s3"]
---
We'll learn how to deployment when build React app used to S3 and CloudFront with TravisCI.

TravisCI is free only in open source projects. It is an easy to use and highly popular service. Using GitHub, we will be able to manage the Continuous Deployment process. For this, we will use Amazon’s S3 and CloudFront services.

## S3

Now, as a first step, we should create a bucket in S3 service and edit its policy to make it public.
You can add this code using the editor. Be sure to change the example-bucket field to your bucket name.

```json
{
  "Version":"2012-10-17",
  "Statement":[
    {
      "Sid":"AddPerm",
      "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::examplebucket/*"]
    }
  ]
}
```

* https://docs.aws.amazon.com/en_us/AmazonS3/latest/dev/example-bucket-policies.html
* https://docs.aws.amazon.com/en_us/AmazonS3/latest/dev/using-with-s3-actions.html

Then, enable static website hosting in the properties area.
You now have a public S3 bucket. By the way, don’t forget change the index document field to your root HTML file name. Finally S3 bucket is ready, let’s it ready CloudFront now.

## CloudFront

Next step, you have to open the CloudFront service and create a new distribution.
In this area, you should edit the Origin Domain Name field to choose name of S3 Bucket’s you want to use and must be write into Default Root Object field your root HTML file name. This will take some time to be ready. Don’t worry. Don’t forget the Distribution ID, we will need it. Please, take a note.

## IAM

Using IAM, to access S3 and CloudFront from the TravisCI we need to allow. So we need to add AmazonS3FullAccess and CloudFrontFullAccess permissions our account.

## TravisCI

We need to create a .travis.yml file and we will configure this file. We’re going to need some secret keys, we need to add them on the Travis and our .travis.yml file should be as shown below:

```yml
language: node_js
node_js:
  - '9'
  - '8'
  - node
install:
- yarn global add travis-ci-cloudfront-invalidation
- yarn
script:
- yarn test
- yarn build
deploy:
  provider: s3
  access_key_id: $AWS_ACCESS_ID
  secret_access_key: $AWS_SECRET_ID
  bucket: 'XXX-frontend-app'
  local_dir: dist
  skip_cleanup: true
  on:
    branch: master
after_deploy:
  - travis-ci-cloudfront-invalidation -a $AWS_ACCESS_ID -s $AWS_SECRET_ID -c $CF_ID -i '/*' -b $TRAVIS_BRANCH -p $TRAVIS_PULL_REQUEST
```

Why did we use the travis-ci-cloudfront-invalidation package? You can read this source for the answer:

* https://developer.bombbomb.com/blog/2018/02/27/TravisCI-Cloudfront-Cache-Invalidation/