import UnbanUser from '@/components/TwitchDash-Components/UserStuff/ChannelModeration/Bans/UnBanUser'
import React from 'react'
import {Tabs, Tab, TabList, Divider, TabPanels, TabPanel, VStack} from '@chakra-ui/react'
import BanUser from '@/components/TwitchDash-Components/UserStuff/ChannelModeration/Bans/BanUser'
import { ModeratorsTab } from '@/components/TwitchDash-Components/UserStuff/ChannelModeration/Modertators'
import ModTabs from '@/components/TwitchDash-Components/UserStuff/ChannelModeration/ModerationTabs'

const Moderation = () => {
  return (
    <React.Fragment>
        <Divider />
        <VStack pt={5}>
            <ModTabs />
        </VStack>
        <Tabs isFitted mr={4} ml="4">
            <TabList mb="1em" width="100%">
                <Tab>Ban User</Tab>
                <Tab>Unban User</Tab>
                <Tab>Timeout User</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <BanUser />
                </TabPanel>
                <TabPanel>
                    <UnbanUser />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </React.Fragment>
  )
}

export default Moderation