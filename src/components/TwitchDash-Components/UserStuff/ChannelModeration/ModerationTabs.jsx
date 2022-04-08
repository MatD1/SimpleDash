import {
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel,
    Box,
    Text,
    Heading
  } from "@chakra-ui/react";
import { Banned } from "./BannedUsers";
  import { EditorsTab } from "./Editors";
  import { ModeratorsTab } from "./Modertators";
  
  export default function ModTabs() {
    return (
      <>
        <Box>
          <Heading fontSize="20px" mt="5" mb="-5">Moderation Tabs</Heading>
          <Tabs isLazy isFitted variant="enclosed" mt={7}>
            <TabList mb="1em" w="100%">
                <Tab whiteSpace={[ 'nowrap']}><Text fontSize={{base: '14px', sm: '10px', md: '14px', lg: '14px'}}>Channel Moderators</Text></Tab>
                <Tab whiteSpace={['null', 'nowrap']}><Text fontSize={{base: '14px', sm: '10px', md: '14px', lg: '14px'}}  >Channel Editors</Text></Tab>
                <Tab whiteSpace={['null', 'nowrap']}><Text fontSize={{base: '14px', sm: '10px', md: '14px', lg: '14px'}}  >Banned Users</Text></Tab>
               
              </TabList>
              <TabPanels>
                <TabPanel>
                    <ModeratorsTab />
                </TabPanel>
                <TabPanel>
                    <EditorsTab />
                </TabPanel>
                <TabPanel>
                    <Banned />
                </TabPanel>
              </TabPanels>
          </Tabs>
        </Box>
      </>
    )
  }