namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    DYNAMODB_TABLE: string;
    DEFAULT_REGION: string;
  }
}
