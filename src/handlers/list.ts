import type { APIGatewayProxyHandler } from "aws-lambda";
import { listTodos } from "utils/db";

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    const todos = await listTodos();

    if (!todos) {
      throw new Error("Couldn't fetch todos");
    }

    return {
      statusCode: 200,
      body: JSON.stringify(todos),
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 400,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't fetch todo items.",
    };
  }
};
