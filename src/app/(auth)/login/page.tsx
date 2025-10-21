import { requireUnAuth } from "@/lib/auth-utils";
import LoginClient from "./login-client";

export default async function Login() {
  await requireUnAuth();
  return <LoginClient />;
}
