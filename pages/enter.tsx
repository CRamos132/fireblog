import React, { useState, useContext, useEffect, useCallback } from "react"
import SignOutButton from "../components/SignOutButton"
import { UserContext } from "../lib/context"
import { auth, firestore, googleAuthProvider } from "../lib/firebase"
import { useDebounce } from "../lib/hooks"

export default function EnterPage() {
  const { user, username} = useContext(UserContext)
  console.log(user)
  console.log(username)
  return (
    <main>
      Signup
      {!user && <SignInButton />}
      {user && !username && <UsernameForm />}
      {user && username && <SignOutButton />}
    </main>
  )
}
  
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider)
  }
  return (
    <button className='btn-google' onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  )
}

function UsernameForm() {
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [loading, setIsLoading] = useState(false)

  const checkUsername = async (value: string) => {
    if(value.length >= 3){
      const ref = firestore.doc(`usernames/${value}`)
      const {exists} = await ref.get()
      console.log('Firestore read')
      setIsValid(!exists)
      setIsLoading(false)
    }
  }

  const debouncedCheckUsername = useCallback(useDebounce(checkUsername, 500), [])

  const {user, username} = useContext(UserContext)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLocaleLowerCase()
    const validation = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    setFormValue(value)
    if(value.length > 3){
      setIsLoading(false)
      setIsValid(false)
    }
    if(validation.test(value)){
      setIsLoading(true)
      setIsValid(false)
    }
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const userDoc = firestore.doc(`users/${user.uid}`)
    const usernameDoc = firestore.doc(`usernames/${formValue}`)

    const batch = firestore.batch()
    batch.set(userDoc, {
      username: formValue, 
      photoURL: user.photoURL, 
      displayName: user.displayName
    })
    batch.set(usernameDoc, {uid: user.uid})
    await batch.commit()
  }

  useEffect(()=>{
    debouncedCheckUsername(formValue)
  },[formValue])

  return (
    !username && (
      <section>
      <h3>Choose username</h3>
      <form onSubmit={onSubmit}>
        <input name='username' placeholder='username' value={formValue} onChange={onChange} autoComplete='off' />
        <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
        <button type='submit' className='btn-green' disabled={!isValid}>
          Choose
        </button>
        <h3>Debug state</h3>
        <div>
          Username: {formValue}
          <br />
          Loading: {loading.toString()}
          <br />
          username Valid: {isValid.toString()}
        </div>
      </form>
    </section>
    )
  )
}

interface IUsernameMessage {
  username: string; 
  isValid: boolean; 
  loading: boolean;
}

function UsernameMessage({username, isValid, loading}: IUsernameMessage){
  if(loading){
    return <p>Checking...</p>
  }
  if(!username){
    return <p></p>
  }
  if(isValid){
    return <p className='text-success'>{username} is available!</p>
  }
  if(username && !isValid){
    return <p className="text-danger">That username is taken!</p>
  }
  return <p></p>
}