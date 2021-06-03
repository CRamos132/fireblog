import { auth } from "../lib/firebase"

export default function SignOutButton() {
    const signOut = () => {
      auth.signOut()
    }
    return <button onClick={signOut}>Sign out</button>
  }