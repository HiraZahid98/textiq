import { NextRequest, NextResponse } from 'next/server';
import { analyzeText } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { text } = await req.json();

    if (!text || text.trim().length < 50) {
      return NextResponse.json(
        { error: 'Text must be at least 50 characters' },
        { status: 400 }
      );
    }

    const analysis = await analyzeText(text);

    await supabase.from('analyses').insert({
      user_email: session.user?.email,
      original_text: text,
      word_count: text.split(' ').length,
      ...analysis,
    });

    return NextResponse.json(analysis);

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    );
  }
}