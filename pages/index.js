import {
  VStack,
  Center,
  Box,
  Text,
} from '@chakra-ui/react'
import { useSession } from "next-auth/react"
import LoginModal from '../components/UI/loginModal'

export default function Home() {
  const { data: session,  status } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return (
      <>
        <VStack h='480px'>
          <Center>
            <Box mt={40}>
              <Text sx={{fontSize: '30px'}} m={['4', '3']}>If your seeing this page you need to login, otherwise we can't show you any data related to you from you're Twitch account</Text>
              <LoginModal />
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
              <Text sx={{fontSize: '30px'}} m={['4', '3']}>Thanks for checking out TwitchDash!</Text>
              <Text sx={{fontSize: '30px'}} m={['4', '3']}>Press the button above that says "Dashboard" to view your awesome Dashboard</Text>
            </Box>
          </Center>
        </VStack>
    </>
  )
}
