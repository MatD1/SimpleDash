import {
  VStack,
  Divider,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Center,
  Box,
  Text,
  Button
} from "@chakra-ui/react";
import { Followed } from "../../components/Tab1/Followed";
import { TopTen } from "../../components/Tab1/Top";
import { UserCard } from "../../components/TwitchDash-Components/UserCard";

import { useSession, getSession, signIn } from "next-auth/react"

export default function Dash() {
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
              <Text sx={{fontSize: '30px'}}>You are not signed in and access to this page is denied</Text>
              <Button onClick={() => signIn()}>Log In</Button>
            </Box>
          </Center>
        </VStack>
      </>
    )
  }

  return (
    <>
      <VStack>
        <UserCard />
    </VStack>
    <Divider width="100%" mb={8} />
      <Tabs isFitted variant="enclosed" mr={4} ml={4}>
        <TabList mb="1em" width="100%">
          <Tab>Followed Streams</Tab>
          <Tab>Top 10</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Followed />
          </TabPanel>
          <TabPanel>
              <TopTen />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}