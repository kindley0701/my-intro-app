import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const hobby = await prisma.hobby.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(hobby);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const data = await req.json();
  const updated = await prisma.hobby.update({
    where: { id: Number(params.id) },
    data,
  });
  return NextResponse.json(updated);
}
