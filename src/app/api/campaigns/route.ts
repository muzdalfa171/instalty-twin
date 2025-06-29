import { NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Campaign name is required' },
        { status: 400 }
      );
    }

    const campaignsRef = collection(db, 'campaigns');
    const timestamp = serverTimestamp();
    
    const docRef = await addDoc(campaignsRef, {
      name: name.trim(),
      status: 'draft',
      createdAt: timestamp,
      updatedAt: timestamp,
      progress: '0%',
      sent: 0,
      click: 0,
      replied: 0,
      opportunities: 0
    });

    return NextResponse.json({
      success: true,
      id: docRef.id,
      message: 'Campaign created successfully'
    });

  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
} 