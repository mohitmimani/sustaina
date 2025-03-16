import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.item.findMany({
    where: { receipt: { userId: session.user.id } },
  });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const newItem = await prisma.item.create({
    data,
  });
  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const updatedItem = await prisma.item.update({
    where: { id: data.id, receipt: { userId: session.user.id } },
    data,
  });
  return NextResponse.json(updatedItem);
}

export async function DELETE(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const deletedItem = await prisma.item.delete({
    where: { id: data.id, receipt: { userId: session.user.id } },
  });
  return NextResponse.json(deletedItem);
}
