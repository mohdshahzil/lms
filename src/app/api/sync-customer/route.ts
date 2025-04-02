import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import payload from "payload";

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    }).then((res) => res.json());

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { id, email_addresses } = user;

    const existingCustomer = await payload.find({
      collection: "customers",
      where: { clerkId: { equals: id } },
    });

    if (!existingCustomer.docs.length) {
      await payload.create({
        collection: "customers",
        data: {
          clerkId: id,
          email: email_addresses[0].email_address,
        },
      });
    }

    return NextResponse.json({ message: "User synced successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
