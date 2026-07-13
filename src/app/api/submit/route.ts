// 
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

//i forgot i never added a GET method just a post...
//
export async function GET() {
  try {
    // Fetch the most recent entry
    //or maybe it should say findMany?
    const latestEntry = await prisma.transaction.findFirst({
      orderBy: { id: 'desc' },
    })

     // checking
    console.log('Database query result:', latestEntry)
    
    return NextResponse.json({ latestEntry })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}


export async function POST(request: Request) {
  const body = await request.json()
  const { assets, liabilities, netWorth, amount, name, type } = body

try{
    await prisma.transaction.create({
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
