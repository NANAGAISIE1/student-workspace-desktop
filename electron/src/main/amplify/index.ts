import {
  signUp as userSignup,
  signOut as userSignout,
  fetchAuthSession,
} from "aws-amplify/auth";

import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../amplify/data/resource.js";
import { Amplify } from "aws-amplify";

const client = generateClient<Schema>();

export async function signUp(email: string, password: string, name: string) {
  try {
    const user = await userSignup({
      username: email,
      password: password,
      options: {
        userAttributes: {
          username: name,
        },
      },
    });
    console.log("User signed up:", user.userId);
    return { success: true, user };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
}

export async function signOut() {
  try {
    await userSignout();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function getCurrentSession() {
  try {
    const session = (await fetchAuthSession()).tokens.accessToken;
    console.log("This is the session data", session);
    return session;
  } catch (error) {
    console.error("Error getting current session:", error);
    return null;
  }
}

export async function getTodos() {
  try {
    console.log("Amplify config:", Amplify.getConfig());
    const { data, errors } = await client.models.Todo.list();
    console.log("List todo errors", errors);
    console.log("List todo data", data);
    return { data, errors };
  } catch (error) {
    console.log("Error listing todos", error);
    return { error };
  }
}
