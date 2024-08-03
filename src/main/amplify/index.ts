import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
import outputs from "../../../amplify_outputs.json";
import { Amplify } from "aws-amplify";

try {
  Amplify.configure(outputs);
  console.log("Amplify configured successfully");
} catch (error) {
  console.error("Error configuring Amplify:", error);
}

const client = generateClient<Schema>();

export async function testAmplifyConnection() {
  try {
    // Attempt to list todos as a test
    const todos = await client.models.Todo.list();
    console.log("Successfully connected to Amplify. Todos:", todos);
    return { success: true, message: "Amplify connection successful" };
  } catch (error) {
    console.error("Error testing Amplify connection:", error);
    return {
      success: false,
      message: `Amplify connection failed: ${error.message}`,
    };
  }
}

export const fetchTodos = async () => {
  const { data: todos, errors } = await client.models.Todo.list();
  return { errors, todos };
};

export const createTodo = async (content: string) => {
  const { data, errors } = await client.models.Todo.create({
    content: [content],
  });
  return { errors, data };
};
