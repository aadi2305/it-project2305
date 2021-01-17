import React, { useState, useEffect, createContext, useContext } from 'react';
import {auth} from "../firebase"

const AuthContext = createContext()

export const useAuth = ()=>{
    return useContext(AuthContext)
}

export const AuthProvider = ({children})=>{
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState()

    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    function login(email, password) {
        
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        signup,
        login,
        updatePassword,
        updateEmail,
        resetPassword,
        logout,
        currentUser
    }
    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider >
    );
}