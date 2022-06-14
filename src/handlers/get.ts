import type { APIGatewayProxyHandler } from "aws-lambda";
import { getTodo } from "utils/db";

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    if (!event.pathParameters?.id) {
      throw new Error("Missing query parameter 'id'");
    }

    const item = await getTodo({
      id: event.pathParameters.id,
    });

    if (!item) {
      throw new Error("Failed to get todo item");
    }

    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 400,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't fetch the todo item.",
    };
  }
};
