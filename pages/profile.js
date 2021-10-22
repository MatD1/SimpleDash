import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"

export default function Component() {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return (
        <>
            <p>Signed in as {session.user.email}</p>
            <p>Token {session.accessToken}</p>
            <p>id {session.id}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </>
    )
  }

  return <a href="/api/auth/signin">Sign in</a>
}