import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { ItemSchema, Item } from "@/prisma/generated/zod";

const unauthorizedResponse = NextResponse.json(
  { error: "Unauthorized" },
  { status: 401 }
);
const invalidDataResponse = NextResponse.json(
  { error: "Invalid data" },
  { status: 400 }
);

export async function GET(
  req: NextRequest
): Promise<NextResponse<Item[] | { error: string }>> {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return unauthorizedResponse;
  }

  const items = await prisma.item.findMany({
    where: { receipt: { userId: session.user.id } },
  });
  return NextResponse.json(items);
}

export async function POST(
  req: NextRequest
): Promise<NextResponse<Item | { error: string }>> {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return unauthorizedResponse;
  }

  const body = await req.json();
  const parsedBody = ItemSchema.safeParse(body);

  if (!parsedBody.success) {
    return invalidDataResponse;
  }

  const newItem = await prisma.item.create({
    data: parsedBody.data,
  });
  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(
  req: NextRequest
): Promise<NextResponse<Item | { error: string }>> {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return unauthorizedResponse;
  }

  const body = await req.json();
  const parsedBody = ItemSchema.safeParse(body);

  if (!parsedBody.success) {
    return invalidDataResponse;
  }

  const updatedItem = await prisma.item.update({
    where: { id: parsedBody.data.id, receipt: { userId: session.user.id } },
    data: parsedBody.data,
  });
  return NextResponse.json(updatedItem);
}

export async function DELETE(
  req: NextRequest
): Promise<NextResponse<Item | { error: string }>> {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return unauthorizedResponse;
  }

  const body = await req.json();
  const { id } = z.object({ id: z.string() }).parse(body);

  const deletedItem = await prisma.item.delete({
    where: { id, receipt: { userId: session.user.id } },
  });
  return NextResponse.json(deletedItem);
}
