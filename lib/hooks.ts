import {useEffect, useState, useRef} from 'react'
import {useAuthState} from 'react-firebase-hooks/auth'
import { auth, firestore } from '../lib/firebase';


interface User {
    photoURL?: string;
}
interface IUserData {
    user: User;
    username: string | null;
}

const useUserData = (): IUserData => {
    const [user] = useAuthState(auth)
    const [username, setUsername] = useState(null)

    useEffect(()=>{
    let unsubscribe
    if(user){
        const ref = firestore.collection('users').doc(user.uid)
        unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username)
        }) 
    } else {
        setUsername(null)
    }
    return unsubscribe
    },[user])

    return {user, username}
}


/**
 * A debouncer hook to delay functions
 *
 * Example:
 *
 * const debouncedAction = useDebounce(()=>{alert('hi)}, 500);
 *
 * calling debouncedAction() will wait then alert
 * @param action the function you want to debounce
 * @param wait  the wait untill the function is called
 * @returns the debounced function
 */
const useDebounce = (
  action: (...args: string[]) => void,
  wait: number,
): (...args: string[]
) => void => {
  const timeoutRef = useRef<number | undefined>(undefined);

  const debouncedAction = (...args: string[]): void => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      action(...args);
    }, wait);
  };

  return debouncedAction;
};


export {useUserData, useDebounce}