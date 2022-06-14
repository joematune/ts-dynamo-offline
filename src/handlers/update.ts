import type { APIGatewayProxyHandler } from "aws-lambda";
import { updateTodo } from "utils/db";

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    const { text, checked } = JSON.parse(event.body || "{}");

    if (typeof text !== "string" || typeof checked !== "boolean") {
      throw new Error("Invalide params for 'text' or 'checked'");
    }

    if (!event.pathParameters?.id) {
      throw new Error("Missing query parameter 'id'");
    }

    const item = await updateTodo({
      id: event.pathParameters.id,
      text,
      checked,
    });

    if (!item) {
      throw new Error("Failed to update todo item");
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
