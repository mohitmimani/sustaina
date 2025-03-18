import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth"; // Adjust the import path as necessary
import { z } from "zod";
import { ReceiptWithoutIdSchema } from "@/lib/schema/extended";

const unauthorizedResponse = NextResponse.json(
  { error: "Unauthorized" },
  { status: 401 }
);
const invalidDataResponse = NextResponse.json(
  { error: "Invalid data" },
  { status: 400 }
);

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return unauthorizedResponse;
  }

  const receipts = await prisma.receipt.findMany({
    where: { userId: session.user.id },
    include: { items: true },
  });
  return NextResponse.json(receipts);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return unauthorizedResponse;
  }

  const body = { ...(await req.json()), userId: session.user.id };
  const parsedBody = ReceiptWithoutIdSchema.safeParse(body);
  console.log(parsedBody.error, parsedBody.data);

  if (!parsedBody.success) {
    return invalidDataResponse;
  }
  const newReceipt = await prisma.receipt.create({
    data: {
      ...parsedBody.data,
      userId: session.user.id,
      items: {
        create: parsedBody?.data?.items || [],
      },
    },
  });
  return NextResponse.json(newReceipt, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return unauthorizedResponse;
  }

  const body = await req.json();
  const parsedBody = ReceiptWithoutIdSchema.safeParse(body);

  if (!parsedBody.success) {
    return invalidDataResponse;
  }

  const updatedReceipt = await prisma.receipt.update({
    where: { id: parsedBody.data.id!, userId: session.user.id },
    data: {
      ...parsedBody.data,
      userId: session.user.id, // Ensure userId is always a string
      items: {
        update: parsedBody.data?.items?.map((item) => ({
          where: { id: item.id },
          data: item,
        })),
      },
    },
  });
  return NextResponse.json(updatedReceipt);
}

export async function DELETE(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return unauthorizedResponse;
  }

  const body = await req.json();
  const { id } = z.object({ id: z.string() }).parse(body);

  const deletedReceipt = await prisma.receipt.delete({
    where: { id, userId: session.user.id },
  });
  return NextResponse.json(deletedReceipt);
}
