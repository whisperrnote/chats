import { Client, Databases, ID, Query, Permission, Role } from "appwrite";
import { AppwriteException } from "../lib/appwrite";
import { User } from "../types/user";
import { getUser as getUserFromDB } from "../hooks/useAuth";

const client = new Client();
client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

export async function getUser(userId: string) {
  // TODO: Fetch user from backend
  return null;
}

export async function updateUser(userId: string, updates: any) {
  // TODO: Update user in backend
  return null;
}