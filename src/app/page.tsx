import { requireAuth } from "@/lib/better-auth/auth-utils";
import Logout from "./logout";

export default async function Home() {
  await requireAuth();

  const data = await caller.getUsers();

  return (
    <div>
      <Logout />{" "}
    </div>
  );
}
