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
  Button,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack
} from "@chakra-ui/react";
import { Followed } from "@/components/TwitchDash-Components/Tabs/Followed";
import { TopTen } from "@/components/TwitchDash-Components/Tabs/Top";
import { UserCard } from "@/components/TwitchDash-Components/UserStuff/UserCard";

import { useSession, signIn } from "next-auth/react"
import { TopTwentyGames } from "@/components/TwitchDash-Components/Tabs/TopGames";
import ModTabs from "@/components/TwitchDash-Components/UserStuff/ChannelModeration/ModerationTabs";
import EmoteTabs from "@/components/TwitchDash-Components/UserStuff/Emotes/EmoteTabs";

export default function Home() {
  const { data: status } = useSession()

  if (status === "loading") {
    return <>
      <Box padding='6' boxShadow='lg' bg='white'>
        <SkeletonCircle size='10' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' />
      </Box>
    </>
  }

  if (status === "unauthenticated") {
    return (
      <>
        <VStack h='480px'>
          <Center>
            <Box mt={40}>
              <Alert status="error" variant="solid">
                <AlertIcon />
                <AlertTitle mr={2}>
                  You aren't logged in
                </AlertTitle>
                <AlertDescription>
                To view this page you will need to log in.
                </AlertDescription>
                <Button onClick={() => signIn()}>Log In</Button>
              </Alert>
            </Box>
          </Center>
        </VStack>
      </>
    )
  }

  return (
    <>
      <VStack>
        <Stack direction={{md: 'column', base: 'column', sm: 'column', lg: 'row'}} spacing={'10'}>
            <UserCard />
            <ModTabs />
        </Stack>
      </VStack>
    <EmoteTabs />
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