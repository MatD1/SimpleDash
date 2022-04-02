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
    SkeletonText
  } from "@chakra-ui/react";
import { GetChannelEmotes } from "./GetChannelEmotes";
import { GetGlobalEmotes } from "./GetGlobalEmotes";
  
  export default function EmoteTabs() {
    return (
        <Tabs isLazy isFitted variant="enclosed" mr={['5', '4']} ml={['5', '4']} pt={'2'} >
          <TabList mb="1em" width="100%" mr={['null', '4']} ml={['null', '4']}>
            <Tab whiteSpace={['normal']} pl={30} pr={30}>Channel Emotes</Tab>
            <Tab  whiteSpace={['normal']}>Glboal Emotes</Tab>
          </TabList>
          <TabPanels>
            <TabPanel overflowX="auto">
                <GetChannelEmotes />
            </TabPanel> 
            <TabPanel overflowX="auto">
              <Center>
                <GetGlobalEmotes />
              </Center>
            </TabPanel>
          </TabPanels>
        </Tabs>
    )
  }