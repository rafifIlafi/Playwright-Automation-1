import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST: Track a click event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentType, contentName, contentId } = body;

    // Validate required fields
    if (!contentType || !contentName) {
      return NextResponse.json(
        { success: false, error: 'contentType and contentName are required' },
        { status: 400 }
      );
    }

    // Check if user is logged in
    const sessionId = request.cookies.get('session')?.value;
    const userId = sessionId || null;

    // Create click analytics entry using Prisma
    await db.clickAnalytics.create({
      data: {
        userId,
        contentType,
        contentName,
        contentId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Click tracked successfully',
    });
  } catch (error) {
    console.error('Error tracking click:', error);
    // Silently fail to not affect user experience
    return NextResponse.json(
      { success: false, error: 'Failed to track click' },
      { status: 500 }
    );
  }
}

// GET: Get click analytics statistics
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const sessionId = request.cookies.get('session')?.value;

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const user = await db.user.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    if (!user || user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden. Only admin can view click analytics.' },
        { status: 403 }
      );
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Get all click analytics
    const allClicks = await db.clickAnalytics.findMany({
      select: {
        id: true,
        userId: true,
        contentType: true,
        contentName: true,
        contentId: true,
        clickedAt: true,
      },
    });

    // Calculate statistics
    const totalClicks = allClicks.length;
    const todayClicks = allClicks.filter(c => new Date(c.clickedAt) >= today).length;
    const weekClicks = allClicks.filter(c => new Date(c.clickedAt) >= weekAgo).length;
    const monthClicks = allClicks.filter(c => new Date(c.clickedAt) >= monthAgo).length;

    // Get clicks by logged-in users vs anonymous
    const loggedClicks = allClicks.filter(c => c.userId !== null).length;
    const anonymousClicks = allClicks.filter(c => c.userId === null).length;

    // Get clicks by content type
    const clicksByTypeMap = new Map<string, number>();
    allClicks.forEach(c => {
      const count = clicksByTypeMap.get(c.contentType) || 0;
      clicksByTypeMap.set(c.contentType, count + 1);
    });
    const clicksByContentType = Array.from(clicksByTypeMap.entries())
      .map(([contentType, count]) => ({ contentType, count }))
      .sort((a, b) => b.count - a.count);

    // Get most clicked content
    const contentClicksMap = new Map<string, { contentType: string; count: number }>();
    allClicks.forEach(c => {
      const key = `${c.contentType}:${c.contentName}`;
      const existing = contentClicksMap.get(key);
      if (existing) {
        existing.count++;
      } else {
        contentClicksMap.set(key, { contentType: c.contentType, count: 1 });
      }
    });
    const mostClicked = Array.from(contentClicksMap.entries())
      .map(([key, data]) => ({
        contentName: key.split(':')[1],
        contentType: data.contentType,
        count: data.count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Get clicks per day for the last 7 days
    const dailyClicks = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

      const count = allClicks.filter(c => {
        const clickDate = new Date(c.clickedAt);
        return clickDate >= dayStart && clickDate < dayEnd;
      }).length;

      dailyClicks.push({
        date: dateStr,
        count,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        totalClicks,
        todayClicks,
        weekClicks,
        monthClicks,
        loggedClicks,
        anonymousClicks,
        clicksByContentType,
        mostClicked,
        dailyClicks,
      },
    });
  } catch (error) {
    console.error('Error fetching click analytics:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch click analytics' },
      { status: 500 }
    );
  }
}
