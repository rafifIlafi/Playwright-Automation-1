import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET: Fetch all program contents
export async function GET() {
  try {
    const programs = await db.programContent.findMany({
      orderBy: {
        programCode: 'asc',
      },
    });

    return NextResponse.json({
      success: true,
      data: programs,
    });
  } catch (error) {
    console.error('Error fetching program contents:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch program contents',
      },
      { status: 500 }
    );
  }
}

// POST: Create/update program content (upsert by programCode)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      programCode,
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

    // Validate required fields
    if (!programCode) {
      return NextResponse.json(
        {
          success: false,
          error: 'programCode is required',
        },
        { status: 400 }
      );
    }

    // Validate programCode is one of the allowed values
    const validProgramCodes = ['dkv', 'tkj', 'kc', 'bdp', 'ak', 'mplb'];
    if (!validProgramCodes.includes(programCode)) {
      return NextResponse.json(
        {
          success: false,
          error: `programCode must be one of: ${validProgramCodes.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Prepare data - convert arrays to JSON strings
    const programData: any = {
      programCode,
    };

    if (title !== undefined) programData.title = title;
    if (description !== undefined) programData.description = description;
    if (vision !== undefined) programData.vision = vision;
    if (goals !== undefined) {
      programData.goals = typeof goals === 'string' ? goals : JSON.stringify(goals);
    }
    if (competencies !== undefined) {
      programData.competencies = typeof competencies === 'string' ? competencies : JSON.stringify(competencies);
    }
    if (subjects !== undefined) {
      programData.subjects = typeof subjects === 'string' ? subjects : JSON.stringify(subjects);
    }
    if (jobs !== undefined) {
      programData.jobs = typeof jobs === 'string' ? jobs : JSON.stringify(jobs);
    }
    if (majors !== undefined) {
      programData.majors = typeof majors === 'string' ? majors : JSON.stringify(majors);
    }
    if (partners !== undefined) {
      programData.partners = typeof partners === 'string' ? partners : JSON.stringify(partners);
    }
    if (facilities !== undefined) {
      programData.facilities = typeof facilities === 'string' ? facilities : JSON.stringify(facilities);
    }
    if (achievements !== undefined) {
      programData.achievements = typeof achievements === 'string' ? achievements : JSON.stringify(achievements);
    }
    if (certifications !== undefined) {
      programData.certifications = typeof certifications === 'string' ? certifications : JSON.stringify(certifications);
    }
    if (gallery !== undefined) {
      programData.gallery = typeof gallery === 'string' ? gallery : JSON.stringify(gallery);
    }
    if (testimonials !== undefined) {
      programData.testimonials = typeof testimonials === 'string' ? testimonials : JSON.stringify(testimonials);
    }

    // Upsert program content
    const program = await db.programContent.upsert({
      where: { programCode },
      update: programData,
      create: {
        title: title || '',
        description: description || '',
        vision: vision || '',
        goals: goals || '[]',
        competencies: competencies || '[]',
        subjects: subjects || '[]',
        jobs: jobs || '[]',
        majors: majors || '[]',
        partners: partners || '[]',
        facilities: facilities || '[]',
        achievements: achievements || '[]',
        certifications: certifications || '[]',
        gallery: gallery || '[]',
        testimonials: testimonials || '[]',
        ...programData,
      },
    });

    return NextResponse.json({
      success: true,
      data: program,
    });
  } catch (error) {
    console.error('Error creating/updating program content:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create/update program content',
      },
      { status: 500 }
    );
  }
}
