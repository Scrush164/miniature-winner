// 
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()
  const { assets, liabilities, netWorth } = body

  try {
    // 
    await prisma.yourModel.create({
      data: {
        assets: JSON.stringify(assets),
        liabilities: JSON.stringify(liabilities),
        netWorth: netWorth,
        createdAt: new Date()
      }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
  }
}   
