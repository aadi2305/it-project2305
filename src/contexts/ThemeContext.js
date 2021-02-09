import React, { useState, useContext } from 'react';

const ThemeContext = React.createContext();

export const ThemeProvider = ({children})=>{
    
    const [currentTheme, setCurrentTheme] = useState("light");
    const [loginStatus, setloginStatus] = useState(false);


    const updateTheme = (newTheme)=>{
        setCurrentTheme(newTheme)
    }

    const changeLoginStatus = ()=>{
        setloginStatus(!loginStatus);
    }

    const value = {
        currentTheme,
        updateTheme,
        loginStatus,
        changeLoginStatus
    }

    return (
        <ThemeContext.Provider value = {value}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext)
}