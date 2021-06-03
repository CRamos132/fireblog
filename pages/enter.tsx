import { useContext } from "react"
import SignOutButton from "../components/SignOutButton"
import { UserContext } from "../lib/context"
import { auth, googleAuthProvider } from "../lib/firebase"

export default function EnterPage() {
  const { user, username} = useContext(UserContext)
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
  return <button>Set username</button>
}