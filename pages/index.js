import {
  VStack,
  Center,
  Box,
  Text,
  Button }
  from '@chakra-ui/react'
import { useSession, getSession, signIn } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return (
      <>
        <VStack h='480px'>
          <Center>
            <Box mt={40}>
              <Text sx={{fontSize: '30px'}}>If your seeing this page you need to login, otherwise we can't show you any data related to you from you're Twitch account</Text>
              <Button onClick={() => signIn()}>Log In</Button>
            </Box>
          </Center>
        </VStack>
      </>
    )
  }

  return (
    <>
      <VStack h='480px'>
          <Center>
            <Box mt={40}>
              <Text sx={{fontSize: '30px'}}>Thanks for checking out TwitchDash!</Text>
              <Text sx={{fontSize: '30px'}}>Press the button above that says "Dashboard" to view your TwitchDash!</Text>
            </Box>
          </Center>
        </VStack>
    </>
  )
}
