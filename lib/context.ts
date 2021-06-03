import { createContext } from 'react'

interface User {
    photoURL?: string;
}

const userData: {user: User, username: string}  = { user: null, username: null }

export const UserContext = createContext(userData)