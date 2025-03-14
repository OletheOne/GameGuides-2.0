import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Guide from '@/models/Guide';

/**
 * GET /api/guides/[id] - Get a single guide by ID or slug
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectToDatabase();
    
    // First try to find by ID
    let guide = null;
    
    // Check if ID is a valid MongoDB ObjectId format
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      guide = await Guide.findById(id);
    }
    
    // If not found by ID, try by slug
    if (!guide) {
      guide = await Guide.findOne({ slug: id });
    }
    
    if (!guide) {
      return NextResponse.json(
        { error: 'Guide not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(guide);
  } catch (error) {
    console.error('Error fetching guide:', error);
    return NextResponse.json(
      { error: 'Failed to fetch guide' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/guides/[id] - Update a guide by ID
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { title, content, videoUrl, coverImage, featured } = body;
    
    await connectToDatabase();
    
    // Find the guide
    const guide = await Guide.findById(id);
    if (!guide) {
      return NextResponse.json(
        { error: 'Guide not found' },
        { status: 404 }
      );
    }
    
    // Update guide properties
    if (title) guide.title = title;
    if (content) guide.content = content;
    if (videoUrl !== undefined) guide.videoUrl = videoUrl;
    if (coverImage) guide.coverImage = coverImage;
    if (featured !== undefined) guide.featured = featured;
    
    // Update slug if title changed
    if (title && title !== guide.title) {
      const newSlug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
        
      // Check if the new slug already exists (excluding current guide)
      const existingGuide = await Guide.findOne({ 
        slug: newSlug, 
        _id: { $ne: id } 
      });
      
      if (existingGuide) {
        return NextResponse.json(
          { error: 'A guide with this title already exists' },
          { status: 400 }
        );
      }
      
      guide.slug = newSlug;
    }
    
    await guide.save();
    
    return NextResponse.json(guide);
  } catch (error) {
    console.error('Error updating guide:', error);
    return NextResponse.json(
      { error: 'Failed to update guide' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/guides/[id] - Delete a guide by ID
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectToDatabase();
    
    const guide = await Guide.findById(id);
    if (!guide) {
      return NextResponse.json(
        { error: 'Guide not found' },
        { status: 404 }
      );
    }
    
    await Guide.findByIdAndDelete(id);
    
    return NextResponse.json(
      { message: 'Guide successfully deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting guide:', error);
    return NextResponse.json(
      { error: 'Failed to delete guide' },
      { status: 500 }
    );
  }
}