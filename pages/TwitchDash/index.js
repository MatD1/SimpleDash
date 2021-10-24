import axios from "axios";
import {
  VStack,
  Heading,
  Divider,
  Text,
  Box,
  Badge,
  Center,
  Button,
  Flex,
  Link,
  SimpleGrid,
  Stack,
  useColorModeValue,
  HStack,
  Icon,
  Avatar,
  chakra,
  Image,
  ButtonGroup,
  Code,
  Grid,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel
} from "@chakra-ui/react";
import { getSession } from "next-auth/react"
import React, { useState } from "react"
import Moment from 'react-moment'
import Viewers from '../../components/viewers'
// import UserCards from '../../components/topCards'

const Twitch = ({ TwitchLive, Sk, User }) => {
  const [showKey, setShowKey] = useState(false);
  const Show = () => setShowKey(true);
  const Hide = () => setShowKey(false);
  
  if (!Twitch) {
    return <div>Loading...</div>;
  }
  return (
      <>
      <>
      <VStack>
        {User?.map((us) => (
          console.log(User),
          <Box key={us.id}>
            <Center>
              <Stack direction='column'>
            <Center>
              <Avatar sx={{mt: 6, mr: 2}} src={us.profile_image_url} />
              <Heading mt={2} pt="4">Hi! 👋, {us.display_name}</Heading>
              <Badge
                fontSize="15px"
                minW="23%"
                maxW="13%"
                colorScheme="blue"
                sx={{mb: 6, ml: -3, fontSize: '12px'}}
                borderRadius="5"
              >View Count 👀 {us.view_count}
              </Badge>
            </Center>
                <Text p={5, 2} sx={{fontSize: '20px', }}>Account created on: <Moment style={{fontWeight: 'bold'}}>{us.created_at}</Moment></Text>
                <Center>
                  <Text pl={5, 2} sx={{fontSize: '20px', }}>Twitch user Id:  <Text sx={{fontWeight: 'bold', display: 'inLine'}}>{us.id}</Text></Text>
                </Center>
              </Stack>
            </Center>
          </Box>
        ))}
        {Sk.map((key) => (
          <div key={key.id}>
            <Button m={2} onClick={Show}>Show Stream Key</Button>
            <Button m={2} onClick={Hide}>Hide Stream Key</Button>      
            {showKey ? <Code m={2}>{key.stream_key}</Code>: null}
          </div>
        ))}
      </VStack>
      <Divider width="100%"  orientation="horizontal" colorScheme="blue" />
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab m={2}>Banned Channel Users </Tab>
          <Tab m={2}>Look up user Id</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>👾, You have not banned anyone</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Divider width="100%"  orientation="horizontal" colorScheme="blue" />
      <Heading ml={2} pb={4}>Streams you follow that are live right now!</Heading>
      </>
      <SimpleGrid minChildWidth="300px" spacing="40px">
      {TwitchLive.map((tl) =>(
        console.log(tl),
        <>
        <Box key={tl.id} ml={4} mr={4} mb={2} borderRadius='20px' bgGradient="linear(to-l, #7928CA, #41d4ec)" height="450px" boxShadow="dark-lg">
        <Center>
          <Heading color="white" href={`https://twitch.tv/${tl.user_name}`}>{tl.user_name}</Heading>
          <Badge sx={{marginLeft: 1, marginBottom: 1.5}} colorScheme="blue">👀 {tl.viewer_count}</Badge>

        </Center>
        <div>
            <Text sx={{fontSize: '24px'}} pl={4} pr={2}>{tl.title}</Text>
            <Text pt={2} pl={2}>{tl.user_name} is Playing: <Badge colorScheme="teal" sx={{fontSize: '20px', display: 'inline', }}>{tl.game_name}</Badge></Text>
            <Text pt={2} pl={2}>{tl.user_name} started streaming @: <Badge colorScheme="teal" sx={{fontSize: '20px', display: 'inline', }}><Moment local format="MM:HH DD/MM/YYYY ">{tl.started_at}</Moment></Badge></Text>
          </div>
        </Box>
        </>
        ))}
      </SimpleGrid>
      </>
  );
};

//https://api.twitch.tv/v5/channels/[CHANNEL_ID]/analytics/sessions_summary

Twitch.getInitialProps = async (ctx) => {
  try {
    const session = await getSession({
      req: ctx.req,
    });
    // Console log is acurate won't render to page?
    const followed = await axios.get(
      `https://api.twitch.tv/helix/streams/followed?user_id=${session.id}`,
      {
        headers: {
          "Authorization": `Bearer ${session.accessToken}`,
          "Client-Id": `${process.env.TWITCH_CLIENT_ID}`,
        },
      }
    );
    // Working Fine
    const key = await axios.get(
        `https://api.twitch.tv/helix/streams/key?broadcaster_id=${session.id}`,
        {
          headers: {
            "Authorization": `Bearer ${session.accessToken}`,
            "Client-Id": `${process.env.TWITCH_CLIENT_ID}`,
          },
        }
      );
      // Working Fine
      const Info = await axios.get(
        `https://api.twitch.tv/helix/users?id=${session.id}`,
      {
          headers: {
            "Authorization": `Bearer ${session.accessToken}`,
            "Client-Id": `${process.env.TWITCH_CLIENT_ID}`,
          },
        }
      );

    const TwitchLive = followed.data.data;
    const Sk = key.data.data;
    const User = Info.data.data;
    return { TwitchLive, Sk, User };
  } catch (error) {
    console.log(error);
    return <div>{error.message}</div>;
  }
};

export default Twitch;