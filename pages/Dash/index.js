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
import { Followed } from "../../components/TwitchDash-Components/Tabs/Followed";
import { TopTen } from "../../components/TwitchDash-Components/Tabs/Top";
import { UserCard } from "../../components/TwitchDash-Components/UserStuff/UserCard";

import { useSession, signIn } from "next-auth/react"
import { TopTwentyGames } from "../../components/TwitchDash-Components/Tabs/TopGames";

export default function Dash() {
  const { data: status } = useSession()

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
          <Tab>Top 20 Games</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Followed />
          </TabPanel>
          <TabPanel>
              <TopTen />
          </TabPanel>
          <TabPanel>
            <TopTwentyGames />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}