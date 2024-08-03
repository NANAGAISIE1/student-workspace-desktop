import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource.js";
import outputs from "../../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import Store from "electron-store";

const store = new Store();

try {
  Amplify.configure(outputs);
  console.log("Amplify configured successfully");
} catch (error) {
  console.error("Error configuring Amplify:", error);
}

const client = generateClient<Schema>();


export const fetchTodos = async () => {
  const {data, errors} = await client.models.Todo.list()
    store.set("todos", data);
  store.set("errors", errors);
  const storedData = { todo: store.get("todos"), error: store.get("errors") };
  return storedData;
};


export const createTodo = async (content: string) => {
const { data, errors: createTodoError } = await client.models.Todo.create({
  content: [content],
});
store.set("createTodo", data);
  store.set("createTodoError", createTodoError);
  console.log("Created todo:", data);
}
