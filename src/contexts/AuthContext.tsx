'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, UserRole } from '@/types/user'
import { auth, db } from '@/lib/firebase'
import { 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  user: User | null
  loading: boolean
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Function to get or create user document
  const getOrCreateUserDoc = async (firebaseUser: any) => {
    const userRef = doc(db, 'users', firebaseUser.uid)
    const userDoc = await getDoc(userRef)

    if (userDoc.exists()) {
      // Update last login
      await updateDoc(userRef, {
        lastLoginAt: new Date().toISOString(),
        emailVerified: firebaseUser.emailVerified,
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || '',
      })
      return { ...(userDoc.data() as { role: UserRole }), id: userDoc.id }
    } else {
      // Create new user document
      const userData = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || '',
        role: UserRole.USER,
        emailVerified: firebaseUser.emailVerified,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      }
      await setDoc(userRef, userData)
      return userData
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const userData = await getOrCreateUserDoc(firebaseUser)
          const userObj: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || '',
            photoURL: firebaseUser.photoURL || '',
            role: userData.role || UserRole.USER,
            emailVerified: firebaseUser.emailVerified,
          }
          setUser(userObj)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error in auth state change:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const signInWithEmail = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      // Auth state listener will handle the rest
    } catch (error: any) {
      console.error('Error signing in with email:', error)
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      provider.setCustomParameters({
        prompt: 'select_account'
      })
      await signInWithPopup(auth, provider)
      // Auth state listener will handle the rest
    } catch (error) {
      console.error('Error signing in with Google:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
      router.push('/login')
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signOut,
      signInWithGoogle,
      signInWithEmail
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 