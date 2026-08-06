import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Helper function to check authentication
async function isAuthenticated(request: NextRequest) {
  const sessionId = request.cookies.get('session')?.value;

  if (!sessionId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { id: sessionId },
    select: {
      id: true,
      username: true,
      role: true,
    },
  });

  return user;
}

// GET: Get user activity statistics
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await isAuthenticated(request);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Not authenticated',
        },
        { status: 401 }
      );
    }

    // Check if user is admin (only admin can view statistics)
    if (user.role !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          error: 'Forbidden. Only admin can view user log statistics.',
        },
        { status: 403 }
      );
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Get all user logs with user information
    const allLogs = await db.userLog.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    });

    // Calculate statistics
    const totalLogs = allLogs.length;
    const todayLogs = allLogs.filter(l => new Date(l.createdAt) >= today).length;
    const weekLogs = allLogs.filter(l => new Date(l.createdAt) >= weekAgo).length;
    const monthLogs = allLogs.filter(l => new Date(l.createdAt) >= monthAgo).length;

    // Get unique users who performed actions
    const uniqueUserIds = new Set(allLogs.map(l => l.userId));
    const uniqueUsers = uniqueUserIds.size;

    // Get top actions
    const actionCountsMap = new Map<string, number>();
    allLogs.forEach(l => {
      const count = actionCountsMap.get(l.action) || 0;
      actionCountsMap.set(l.action, count + 1);
    });
    const topActions = Array.from(actionCountsMap.entries())
      .map(([action, count]) => ({ action, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Get top users
    const userCountsMap = new Map<string, { user: any; count: number }>();
    allLogs.forEach(l => {
      const existing = userCountsMap.get(l.userId);
      if (existing) {
        existing.count++;
      } else {
        userCountsMap.set(l.userId, {
          user: l.user || { username: 'Unknown', role: 'Unknown' },
          count: 1,
        });
      }
    });
    const topUsers = Array.from(userCountsMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Get logs per day for the last 7 days
    const dailyLogs: { date: string; count: number }[] = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
        const count = allLogs.filter(l => {
        const logDate = new Date(l.createdAt);
          return logDate >= dayStart && logDate < dayEnd;
    }).length;

  dailyLogs.push({
    date: dateStr,
    count,
  });
}

    return NextResponse.json({
      success: true,
      data: {
        totalLogs,
        todayLogs,
        weekLogs,
        monthLogs,
        uniqueUsers,
        topActions,
        topUsers,
        dailyLogs,
      },
    });
  } catch (error) {
    console.error('Error fetching user log statistics:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch user log statistics',
      },
      { status: 500 }
    );
  }
}
