import { TABLE_NAME } from "config";
import { client } from "connectors/dynamo";
import cuid from "cuid";
import { DB } from "types";
import { format, generateUpdateExpression } from "utils/dynamoHelpers";

export const createTodo = async ({
  text,
  checked = false,
}: Pick<DB.Todo, "text" | "checked">): Promise<DB.Todo | null> => {
  const id = cuid();

  const todoItem: DB.TodoItem = {
    text,
    checked,
    createdAt: new Date(),
    updatedAt: new Date(),
    id,
    type: "TODO",
    PK: `TODO`,
    SK: `TODO#${id}`,
  };

  const res = await client.put({
    TableName: TABLE_NAME,
    Item: format.to(todoItem),
  });

  if (res.$metadata.httpStatusCode !== 200) {
    return null;
  }

  return format.from(todoItem) as DB.Todo;
};

export const deleteTodo = async ({
  id,
}: Pick<DB.Todo, "id">): Promise<true | null> => {
  const res = await client.delete({
    TableName: TABLE_NAME,
    Key: {
      PK: `TODO`,
      SK: `TODO#${id}`,
    },
  });

  const success = res.$metadata.httpStatusCode === 200;

  return success ? true : null;
};

export const getTodo = async ({
  id,
}: Pick<DB.Todo, "id">): Promise<DB.Todo | null> => {
  const data = await client.get({
    TableName: TABLE_NAME,
    Key: {
      PK: `TODO`,
      SK: `TODO#${id}`,
    },
  });

  if (!data.Item) {
    return null;
  }

  return format.from(data.Item);
};

export const updateTodo = async ({
  id,
  text,
  checked,
}: Pick<DB.Todo, "id" | "text"> & {
  checked: NonNullable<DB.Todo["checked"]>;
}): Promise<DB.Todo | null> => {
  const data = await client.update({
    TableName: TABLE_NAME,
    Key: {
      PK: `TODO`,
      SK: `TODO#${id}`,
    },
    ...generateUpdateExpression({
      text,
      checked,
      updatedAt: new Date(),
    }),
    ReturnValues: "ALL_NEW",
  });

  if (!data.Attributes) {
    return null;
  }

  return format.from(data.Attributes) as DB.Todo;
};

export const listTodos = async (): Promise<DB.Todo[] | null> => {
  const data = await client.query({
    TableName: TABLE_NAME,
    KeyConditionExpression: "#PK = :PK AND begins_with(#SK, :SK)",
    ExpressionAttributeNames: {
      "#PK": "PK",
      "#SK": "SK",
    },
    ExpressionAttributeValues: {
      ":PK": `TODO`,
      ":SK": `TODO#`,
    },
  });

  if (!data.Items) {
    return null;
  }

  return data.Items.map((item) => format.from(item)) as DB.Todo[];
};
