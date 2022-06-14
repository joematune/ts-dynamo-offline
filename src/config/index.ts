export const TABLE_NAME = process.env.DYNAMODB_TABLE;

export const IS_OFFLINE = process.env.IS_OFFLINE ? true : undefined;

export const DYNAMODB_OFFLINE_URL = "http://localhost:8000";

export const REGION = IS_OFFLINE ? "localhost" : process.env.DEFAULT_REGION;
