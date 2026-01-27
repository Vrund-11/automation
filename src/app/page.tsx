import { requireAuth } from "@/lib/better-auth/auth-utils";
import { caller } from "@/trpc/server";

export default async function Home() {
 await requireAuth();

 const data = await caller.getUser()
 
  return (
   <div>
   
   </div>
  );
}
