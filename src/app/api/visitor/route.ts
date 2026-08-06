import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST: Log a visitor visit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ip, userAgent } = body;

    // Create visitor log using Prisma
    await db.visitorLog.create({
      data: {
        ip: ip || null,
        userAgent: userAgent || null,
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Visitor logged successfully',
    });
  } catch (error) {
    console.error('Error logging visitor:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to log visitor',
      },
      { status: 500 }
    );
  }
}

// GET: Get visitor statistics
export async function GET() {
  try {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Get all visitor logs
    const allVisits = await db.visitorLog.findMany({
      where: {},
      select: {
        id: true,
        ip: true,
        visitedAt: true,
      },
    });

    // Calculate statistics
    const totalVisits = allVisits.length;
    const todayVisits = allVisits.filter(v => new Date(v.visitedAt) >= today).length;
    const weekVisits = allVisits.filter(v => new Date(v.visitedAt) >= weekAgo).length;
    const monthVisits = allVisits.filter(v => new Date(v.visitedAt) >= monthAgo).length;

    // Get unique visitors (by IP)
    const uniqueIPs = new Set(allVisits.filter(v => v.ip).map(v => v.ip));
    const uniqueVisitors = uniqueIPs.size;

    // Get visits per day for the last 7 days
    const dailyVisits = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

      const count = allVisits.filter(v => {
        const visitDate = new Date(v.visitedAt);
        return visitDate >= dayStart && visitDate < dayEnd;
      }).length;

      dailyVisits.push({
        date: dateStr,
        count,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        totalVisits,
        todayVisits,
        weekVisits,
        monthVisits,
        uniqueVisitors,
        dailyVisits,
      },
    });
  } catch (error) {
    console.error('Error fetching visitor statistics:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch visitor statistics',
      },
      { status: 500 }
    );
  }
}

