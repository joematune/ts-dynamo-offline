<!--
title: 'AWS Serverless HTTP API with DynamoDB and offline support example in NodeJS'
description: 'This example demonstrates how to run a service locally, using the ''serverless-offline'' plugin. It provides an HTTP API to manage Todos stored in DynamoDB.'
layout: Doc
framework: aws-sdk v3 for JavaScript (A modular rewrite of v2 with first-class TypeScript support)
platform: AWS
language: Nodejs - TypeScript
authorLink: 'https://github.com/joematune'
authorName: 'Joe Matune'
authorAvatar: 'https://avatars.githubusercontent.com/u/44626877?v=4&s=140'
-->

# Serverless Node aws-sdk v3 API TypeScript with DynamoDB and offline support

This example demonstrates how to run a service locally, using the
[serverless-offline](https://github.com/dherault/serverless-offline) plugin. It
provides an HTTP API to manage Todos stored in a DynamoDB, similar to the
[aws-node-http-api-dynamodb](https://github.com/serverless/examples/tree/master/aws-node-http-api-dynamodb)
example. A local DynamoDB instance is provided with a Docker image by the AWS team.

## Requirements

- Nodejs
- aws-cli
- Docker _(required only for offline dynamodb instance)_
- jq _(required only for import/export scripts)_

## Setup

```bash
# Install dependencies in root directory
npm install
# Open a new terminal to run the dynamo offline image
cd ./docker && docker-compose up
# Create a new dynamo table with schema in root directory
npm run create-table-local
# Start up local dev server in root directory
npm run dev
```

## Deploy to AWS

```bash
# Create .env file and fill in the aws key / secret
cp ./example.env .env
# Deploy resources
npm run deploy
```

## Usage

You can create, retrieve, update, or delete todos with the following commands. Note that the URL Can be replaced with your live resources after they have been deployed.

### Create a Todo

```bash
# Local
curl -X POST -H "Content-Type:application/json" http://localhost:3001/todos --data '{ "text": "Learn Serverless" }'
```

Example Result:

```bash
{"text":"Learn Serverless","id":"cna490d011e6deiwz051af86","createdAt":1479138570824,"checked":false,"updatedAt":1479138570824}%
```

### List all Todos

```bash
curl -H "Content-Type:application/json" http://localhost:3001/todos
curl -H "Content-Type:application/json" https://xyxyxyxyxy.execute-api.us-east-2.amazonaws.com/todos
```

Example output:

```bash
[{"text":"Deploy my first service","id":"clh105j349i1nzuqm298vt11","checked":true,"updatedAt":1479139961304},{"text":"Learn Serverless","id":"cna490d011e6deiwz051af86","createdAt":1479139943241,"checked":false,"updatedAt":1479139943241}]
```

### Get one Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -H "Content-Type:application/json" http://localhost:3001/todos/<id>
```

Example Result:

```bash
{"text":"Learn Serverless","id":"cna490d011e6deiwz051af86","createdAt":1479138570824,"checked":false,"updatedAt":1479138570824}%
```

### Update a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X PUT -H "Content-Type:application/json" http://localhost:3001/todos/<id> --data '{ "text": "Learn Serverless", "checked": true }'
```

Example Result:

```bash
{"text":"Learn Serverless","id":"cna490d011e6deiwz051af86","createdAt":1479138570824,"checked":true,"updatedAt":1479138570824}%
```

### Delete a Todo

```bash
# Replace the <id> part with a real id from your todos table
curl -X DELETE -H "Content-Type:application/json" http://localhost:3001/todos/<id>
```

## Roadmap

- add gsi1pk & gsi1sk with `TODO#${id}` & `TODO#${id}`
  - PK: USER#joematune
  - SK: TODO#cuidq1w2e3
  - GSI1PK: TODO
  - GSI1SK: TODO#2022-05-07T12:12:12.876Z
 - modify resource so that it can also be the migration yaml
 - tidy helper to / from functions
 - remove unnecessary node_modules
 - tidy webpack config
 - add tsuid
 - add aws-lambda-mock test
 - remove IS_LOCAL from env because you're setting it in `npm run dev`
