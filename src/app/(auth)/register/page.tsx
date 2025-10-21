import { requireUnAuth } from "@/lib/auth-utils";
import RegisterClient from "./register-client";

export default async function Register() {
  await requireUnAuth();
  return <RegisterClient />;
}
