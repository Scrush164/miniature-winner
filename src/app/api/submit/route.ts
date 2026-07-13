// 
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const { assets, liabilities, netWorth, amount, name, type } = body

try{
    await prisma.Transaction.create({
      data: {
        amount: body.amount,
        name: body.name,
        type: body.type,
      }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}   
