import * as vscode from "vscode";

const SECRET_KEY = "githubToken";

export async function getToken(context: vscode.ExtensionContext): Promise<string | undefined> {
  const token = await context.secrets.get(SECRET_KEY);
  return token || undefined;
}

export async function setToken(context: vscode.ExtensionContext, token: string): Promise<void> {
  await context.secrets.store(SECRET_KEY, token);
}

export async function deleteToken(context: vscode.ExtensionContext): Promise<void> {
  await context.secrets.delete(SECRET_KEY);
}
