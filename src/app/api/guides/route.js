import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Guide from '@/models/Guide';

// GET handler to get all guides
export async function GET() {
  try {
    await connectDB();
    const guides = await Guide.find();
    return NextResponse.json(guides);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST handler to create a new guide
export async function POST(request) {
  try {
    const { title, content, videoUrl } = await request.json();
    
    await connectDB();
    
    const newGuide = new Guide({ title, content, videoUrl });
    await newGuide.save();
    
    return NextResponse.json(newGuide, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}