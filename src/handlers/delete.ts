import type { APIGatewayProxyHandler } from "aws-lambda";
import { deleteTodo } from "utils/db";

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    if (!event.pathParameters?.id) {
      throw new Error("Missing query parameter 'id'");
    }

    const itemWasDeleted = await deleteTodo({
      id: event.pathParameters.id,
    });

    if (!itemWasDeleted) {
      throw new Error("Failed to delete todo item");
    }

    return {
      statusCode: 200,
      body: `Successfully deleted todo 'id: ${event.pathParameters.id}'"`,
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 400,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't delete the todo item.",
    };
  }
};
