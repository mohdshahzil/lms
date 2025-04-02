import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignedIn>
        <h1>Welcome to the Dashboard!</h1>
        <UserButton  />
      </SignedIn>

      
    </div>
  );
}
