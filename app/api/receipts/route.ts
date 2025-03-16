import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth"; // Adjust the import path as necessary

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const receipts = await prisma.receipt.findMany({
    where: { userId: session.user.id },
  });
  return NextResponse.json(receipts);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const newReceipt = await prisma.receipt.create({
    data: { ...data, userId: session.user.id },
  });
  return NextResponse.json(newReceipt, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const updatedReceipt = await prisma.receipt.update({
    where: { id: data.id, userId: session.user.id },
    data,
  });
  return NextResponse.json(updatedReceipt);
}

export async function DELETE(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  const deletedReceipt = await prisma.receipt.delete({
    where: { id: data.id, userId: session.user.id },
  });
  return NextResponse.json(deletedReceipt);
}
