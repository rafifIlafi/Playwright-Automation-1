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

// GET: Fetch all user logs (with pagination, query params: page, limit, userId)
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await isAuthenticated(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    // Check if user is admin (only admin can view logs)
    if (user.role !== 'admin') {
      return NextResponse.json({ success: false, error: 'Forbidden. Only admin can view user logs.' }, { status: 403 });
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const userId = searchParams.get('userId');

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return NextResponse.json({ success: false, error: 'Invalid pagination parameters' }, { status: 400 });
    }

    // Build where clause
    let whereClause = '1=1';
    const params: any[] = [];
    
    if (userId) {
      whereClause = 'userId = ?';
      params.push(userId);
    }

    // Get total count
    const totalResult = await db.$queryRaw<Array<{ count: bigint }>>('SELECT COUNT(*) as count FROM UserLog WHERE ' + whereClause, params);

    // Get logs with pagination
    const offset = (page - 1) * limit;
    const logsResult = await db.$queryRaw('SELECT * FROM UserLog WHERE ' + whereClause + ' ORDER BY createdAt DESC LIMIT ? OFFSET ?', [...params, limit, offset]);

    // Get usernames for each log
    const logs = await Promise.all(
      logsResult.map(async (log: any) => {
        const userResult = await db.$queryRaw<Array<{ username: string, role: string }>>('SELECT username, role FROM User WHERE id = ?', [log.userId]);
        return {
          ...log,
          username: userResult[0]?.username || 'Unknown',
          userRole: userResult[0]?.role || 'Unknown',
        };
      })
    );

    const total = Number(totalResult[0]?.count || 0);
    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: logs,
      pagination: { page, limit, total, totalPages },
    });
  } catch (error) {
    console.error('Error fetching user logs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch user logs' }, { status: 500 });
  }
}

// POST: Create a new user log entry
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await isAuthenticated(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();
    const { action, details } = body;

    // Validate required fields
    if (!action) {
      return NextResponse.json({ success: false, error: 'action is required' }, { status: 400 });
    }

    // Create user log using raw query
    const result = await db.$queryRaw('INSERT INTO UserLog (userId, action, details, createdAt) VALUES (?, ?, datetime("now")) RETURNING *', [user.id, action, details || null]);

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error('Error creating user log:', error);
    return NextResponse.json({ success: false, error: 'Failed to create user log' }, { status: 500 });
  }
}
