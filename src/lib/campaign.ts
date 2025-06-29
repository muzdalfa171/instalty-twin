import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface Campaign {
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'active' | 'paused' | 'completed';
  progress: string;
  sent: number;
  click: number;
  replied: number;
  opportunities: number;
}

export const createCampaign = async (campaignData: Omit<Campaign, 'createdAt' | 'updatedAt' | 'progress' | 'sent' | 'click' | 'replied' | 'opportunities'>) => {
  try {
    const campaignsRef = collection(db, 'campaigns');
    const timestamp = serverTimestamp();
    
    const docRef = await addDoc(campaignsRef, {
      ...campaignData,
      createdAt: timestamp,
      updatedAt: timestamp,
      progress: '0%',
      sent: 0,
      click: 0,
      replied: 0,
      opportunities: 0
    });

    return {
      id: docRef.id,
      success: true,
    };
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
}; 