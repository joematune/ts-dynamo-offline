import type { APIGatewayProxyHandler } from "aws-lambda";
import { createTodo } from "utils/db";

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    const { text } = JSON.parse(event.body || "{}");

    if (typeof text !== "string") {
      throw new Error("Missing field 'text' on body");
    }

    const todo = await createTodo({ text });

    if (!todo) {
      throw new Error("Failed to create todo item");
    }

    return {
      statusCode: 200,
      body: JSON.stringify(todo),
    };
  } catch (error) {
    console.log(error);

    return {
      statusCode: 400,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't create the todo item.",
    };
  }
};
