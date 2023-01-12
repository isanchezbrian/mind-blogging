import React, { useContext, useState, useEffect, useRef } from 'react'
import {auth, db} from '../../utils/firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import {doc, getDoc, setDoc} from 'firebase/firestore'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const userInfo = useRef()
    console.log(user)


    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            if(user){
            setUser({
                uid: user.uid,
                email: user.email,
                username: auth.currentUser.displayName,
            })
        } else {
            setUser(null)
        }
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    const signup = async (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
        // .then(
        //     async (result) => {
        //         console.log(result)
        //         try {
        //             const ref = doc(db, 'userInfo', result.user.uid)
        //             const docRef = await setDoc(ref, {username})
        //         } catch (error) {
        //             console.log(error)
        //         }
        //     }
        // )
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