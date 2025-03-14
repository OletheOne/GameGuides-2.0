import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Guide from '@/models/Guide';

/**
 * GET /api/guides - Get all guides
 */
export async function GET() {
  try {
    await connectToDatabase();
    const guides = await Guide.find({}).sort({ publishedDate: -1 });
    
    return NextResponse.json(guides);
  } catch (error) {
    console.error('Error fetching guides:', error);
    return NextResponse.json(
      { error: 'Failed to fetch guides' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/guides - Create a new guide
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content, videoUrl, coverImage, featured } = body;
    
    // Create a slug from the title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    await connectToDatabase();
    
    // Check if guide with this slug already exists
    const existingGuide = await Guide.findOne({ slug });
    if (existingGuide) {
      return NextResponse.json(
        { error: 'A guide with this title already exists' },
        { status: 400 }
      );
    }
    
    const newGuide = new Guide({
      title,
      slug,
      content,
      videoUrl,
      coverImage,
      featured,
    });
    
    await newGuide.save();
    
    return NextResponse.json(newGuide, { status: 201 });
  } catch (error) {
    console.error('Error creating guide:', error);
    return NextResponse.json(
      { error: 'Failed to create guide' },
      { status: 500 }
    );
  }
}