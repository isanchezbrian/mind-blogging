import React, { useContext, useState, useEffect, useRef } from 'react'
import {auth, db} from '../../utils/firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
import {doc, getDoc} from 'firebase/firestore'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const userInfo = useRef()
    console.log(user)



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            if(user){
            setUser({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
            })
        } else {
            setUser(null)
        }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
        
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = async () => {
        setUser(null)
        await signOut(auth)
    }


    return(
        <AuthContext.Provider value={{ user, login, signup, logout}}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}