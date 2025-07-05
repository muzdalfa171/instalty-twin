import { db } from './firebase';
import { collection, addDoc, query, where, getDocs, DocumentData } from 'firebase/firestore';

export interface Lead {
  email: string;
  name?: string;
  company?: string;
  source: 'csv' | 'supersearch' | 'manual' | 'sheets';
  createdAt: Date;
  metadata?: Record<string, any>;
}

export interface CSVUploadMetadata {
  fileName: string;
  totalRows: number;
}

export interface SupersearchMetadata {
  searchQuery: string;
  filters: Record<string, any>;
}

export interface GoogleSheetsMetadata {
  sheetId: string;
  sheetName: string;
}

export const addLeadBatch = async (leads: Lead[], userId: string) => {
  const leadsCollection = collection(db, 'users', userId, 'leads');
  
  const promises = leads.map(lead => 
    addDoc(leadsCollection, {
      ...lead,
      createdAt: new Date(),
    })
  );

  return Promise.all(promises);
};

export const addSingleLead = async (lead: Lead, userId: string) => {
  const leadsCollection = collection(db, 'users', userId, 'leads');
  return addDoc(leadsCollection, {
    ...lead,
    createdAt: new Date(),
  });
};

export const getLeadsBySource = async (source: Lead['source'], userId: string): Promise<Lead[]> => {
  const leadsCollection = collection(db, 'users', userId, 'leads');
  const q = query(leadsCollection, where('source', '==', source));
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Lead[];
};

export const processCSVUpload = async (
  file: File,
  userId: string,
  onProgress?: (progress: number) => void
): Promise<void> => {
  // Implementation for CSV processing will go here
  // This is a placeholder for the actual implementation
};

export const processSheetsImport = async (
  sheetId: string,
  userId: string
): Promise<void> => {
  // Implementation for Google Sheets import will go here
  // This is a placeholder for the actual implementation
}; 