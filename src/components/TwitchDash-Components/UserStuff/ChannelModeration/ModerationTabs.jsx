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
  import { EditorsTab } from "./Editors";
  import { ModeratorsTab } from "./Modertators";
  
  export default function ModTabs() {
    return (
      <>
        <Box>
          <Tabs isFitted variant="enclosed" mt={7}>
            <TabList mb="1em" w="370px">
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

                </TabPanel>
              </TabPanels>
          </Tabs>
        </Box>
      </>
    )
  }