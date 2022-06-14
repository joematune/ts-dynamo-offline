import cuid from "cuid";

type Cuid = ReturnType<typeof cuid>;

export namespace DB {
  export interface DynamoItem<T extends "TODO"> {
    type: T;
    PK: `${T}`;
    SK: `${T}#${Cuid}`;
  }

  export interface Todo {
    id: Cuid;
    text: string;
    checked?: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface TodoItem extends Todo, DynamoItem<"TODO"> {}
}
