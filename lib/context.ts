import { createContext } from 'react'

interface User {
    photoURL?: string;
    uid?: string;
    displayName?: string;
}

const userData: {user: User, username: string}  = { user: null, username: null }

export const UserContext = createContext(userData)