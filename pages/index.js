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
  Stack,
  Badge
} from "@chakra-ui/react";
import { Followed } from "@/components/TwitchDash-Components/Tabs/Followed";
import { TopTen } from "@/components/TwitchDash-Components/Tabs/Top";
import { UserCard } from "@/components/TwitchDash-Components/UserStuff/UserCard";

import { useSession, signIn } from "next-auth/react"
import { TopTwentyGames } from "@/components/TwitchDash-Components/Tabs/TopGames";
import ModTabs from "@/components/TwitchDash-Components/UserStuff/ChannelModeration/ModerationTabs";
import EmoteTabs from "@/components/TwitchDash-Components/UserStuff/Emotes/EmoteTabs";
import HomePage from "./Home";
import Moderation from "./Moderation";

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
    <Divider width="100%" mb={8} />
      <Tabs isFitted variant="soft-rounded" mr={4} ml={4}>
        <TabList mb="1em" width="100%">
          <Tab fontSize={['13px', '18px']}>Streams & More</Tab>
          <Tab fontSize={['13px', '18px']}>Moderation</Tab>
          <Tab isDisabled cursor={'not-allowed'} fontSize={['13px', '18px']}>Live Stuff <Badge ml="2" mt="1" fontSize={['9px', '10px']} size="2xl" colorScheme={'pink'}>Coming Soon!</Badge></Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HomePage />
          </TabPanel>
          <TabPanel>
              <Moderation />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}