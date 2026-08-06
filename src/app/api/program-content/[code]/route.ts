import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET: Fetch single program by code
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    // Validate programCode
    const validProgramCodes = ['dkv', 'tkj', 'kc', 'bdp', 'ak', 'mplb'];
    if (!validProgramCodes.includes(code)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid program code. Must be one of: ${validProgramCodes.join(', ')}`,
        },
        { status: 400 }
      );
    }

    const program = await db.programContent.findUnique({
      where: { programCode: code },
    });

    if (!program) {
      return NextResponse.json(
        {
          success: false,
          error: 'Program content not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: program,
    });
  } catch (error) {
    console.error('Error fetching program content:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch program content',
      },
      { status: 500 }
    );
  }
}

// PUT: Update program content by code
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;
    const body = await request.json();
    const {
      title,
      description,
      vision,
      goals,
      competencies,
      subjects,
      jobs,
      majors,
      partners,
      facilities,
      achievements,
      certifications,
      gallery,
      testimonials,
    } = body;

    // Validate programCode
    const validProgramCodes = ['dkv', 'tkj', 'kc', 'bdp', 'ak', 'mplb'];
    if (!validProgramCodes.includes(code)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid program code. Must be one of: ${validProgramCodes.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Check if program exists
    const existingProgram = await db.programContent.findUnique({
      where: { programCode: code },
    });

    if (!existingProgram) {
      return NextResponse.json(
        {
          success: false,
          error: 'Program content not found',
        },
        { status: 404 }
      );
    }

    // Prepare update data - convert arrays to JSON strings
    const updateData: any = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (vision !== undefined) updateData.vision = vision;
    if (goals !== undefined) {
      updateData.goals = typeof goals === 'string' ? goals : JSON.stringify(goals);
    }
    if (competencies !== undefined) {
      updateData.competencies = typeof competencies === 'string' ? competencies : JSON.stringify(competencies);
    }
    if (subjects !== undefined) {
      updateData.subjects = typeof subjects === 'string' ? subjects : JSON.stringify(subjects);
    }
    if (jobs !== undefined) {
      updateData.jobs = typeof jobs === 'string' ? jobs : JSON.stringify(jobs);
    }
    if (majors !== undefined) {
      updateData.majors = typeof majors === 'string' ? majors : JSON.stringify(majors);
    }
    if (partners !== undefined) {
      updateData.partners = typeof partners === 'string' ? partners : JSON.stringify(partners);
    }
    if (facilities !== undefined) {
      updateData.facilities = typeof facilities === 'string' ? facilities : JSON.stringify(facilities);
    }
    if (achievements !== undefined) {
      updateData.achievements = typeof achievements === 'string' ? achievements : JSON.stringify(achievements);
    }
    if (certifications !== undefined) {
      updateData.certifications = typeof certifications === 'string' ? certifications : JSON.stringify(certifications);
    }
    if (gallery !== undefined) {
      updateData.gallery = typeof gallery === 'string' ? gallery : JSON.stringify(gallery);
    }
    if (testimonials !== undefined) {
      updateData.testimonials = typeof testimonials === 'string' ? testimonials : JSON.stringify(testimonials);
    }

    // Update program content
    const program = await db.programContent.update({
      where: { programCode: code },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: program,
    });
  } catch (error) {
    console.error('Error updating program content:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update program content',
      },
      { status: 500 }
    );
  }
}

// DELETE: Delete program content by code
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    // Validate programCode
    const validProgramCodes = ['dkv', 'tkj', 'kc', 'bdp', 'ak', 'mplb'];
    if (!validProgramCodes.includes(code)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid program code. Must be one of: ${validProgramCodes.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Check if program exists
    const existingProgram = await db.programContent.findUnique({
      where: { programCode: code },
    });

    if (!existingProgram) {
      return NextResponse.json(
        {
          success: false,
          error: 'Program content not found',
        },
        { status: 404 }
      );
    }

    // Delete program content
    await db.programContent.delete({
      where: { programCode: code },
    });

    return NextResponse.json({
      success: true,
      message: 'Program content deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting program content:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete program content',
      },
      { status: 500 }
    );
  }
}
