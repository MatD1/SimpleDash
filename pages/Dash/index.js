import axios from "axios";
import Link from "next/link";
import {
  VStack,
  Heading,
  Divider,
  Text,
  Box,
  Badge,
  Center,
  Skeleton,
  Avatar,
  SimpleGrid,
  Stack,
  IconButton,
  Code,
  Icon,
  Button,
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel
} from "@chakra-ui/react";
import React, {useState} from 'react';
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { LockIcon, UnlockIcon } from '@chakra-ui/icons'
import { KeyModal } from "../../components/keyModal";
import { Followed } from "../../components/Tab1/Followed";
import { TopTen } from "../../components/Tab1/Top";



const fetcher = async (url, accessToken, client) => {
  const res = await axios.get(url, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Client-Id": `xdvirywa3bq2w88tm60wtmw82zumle`,
    },
  });
  return res.data.data;
};

function Dash() {
  const client = process.env.TWITCH_CLIENT_ID;
  const { data: session } = useSession();
  const [showKey, setShowKey] = useState(false);
  const Show = () => setShowKey(true);
  const Hide = () => setShowKey(false);

  const { data: following, error: viewsError } = useSWR(
    session
      ? [
          `https://api.twitch.tv/helix/streams/followed?user_id=${session.id}`,
          session.accessToken, client,
        ]
      : null,
    fetcher,
    { revailidateOnFocus: false },
    { refreshInterval: 120000 },
    { revalidateIfStale: true }
  );
  const { data: key, error: keyErrors } = useSWR(
    session
      ? [
          `https://api.twitch.tv/helix/streams/key?broadcaster_id=${session.id}`,
          session.accessToken,
        ]
      : null,
    fetcher,
    { revailidateOnFocus: false }
  );
  const { data: userInfo, error: userError } = useSWR(
    session
      ? [
          `https://api.twitch.tv/helix/users?id=${session.id}`,
          session.accessToken,
        ]
      : null,
    fetcher,
    { revailidateOnFocus: false }
  );

  if (viewsError)
    return (
      console.log(viewsError),
      (
        <div>
          Theres has been an error, refesh the page or re-login:{" "}
          {viewsError.message}
        </div>
      )
    );
  if (keyErrors)
    return (
      console.log(keyErrors),
      (
        <div>
          Theres has been an error, refesh the page or re-login:{" "}
          {keyErrors.message}
        </div>
      )
    );
  if (userError)
    return (
      console.log(userError),
      (
        <div>
          Theres has been an error, refesh the page or re-login:{" "}
          {userError.message}
        </div>
      )
    );
  if (!following) return (<Skeleton />);
  if (!key) return (<Skeleton />);
  if (!userInfo) (<Skeleton />);

  return <>
    <VStack>
      <SimpleGrid minChildWidth="300px" spacing="20px">
        {userInfo.map((user) => (
          <Box key={user.id} m={[1, 2, 5]} borderColor="black" borderRadius="20px" height="280px" width={[360, 400, 500]} boxShadow="xl">
          <Center>
            <Stack direction="row">
              <Avatar sx={{marginTop: 2.5, marginLeft: 2}} src={user.profile_image_url} />
              <Heading pt="5" sx={{fontSize: '20px'}}>Hi! 👋, {user.display_name}</Heading>
            </Stack>
          </Center>
            <Center>
              <Stack>
                <Badge borderRadius="md" fontSize={['11.5px', '12px']} sx={{marginLeft: 5, marginTop: 2}} colorScheme="facebook">User Id 🏷️ : {user.id}</Badge>
                <Badge borderRadius="md" fontSize={['11.5px', '12px']} sx={{marginLeft: 5, marginTop: 2}} colorScheme="facebook">Total channel views 👀 {user.view_count}</Badge>
                <Badge borderRadius="md" fontSize={['11.5px', '12px']} sx={{marginLeft: 5, marginTop: 2}} colorScheme="facebook">Partnership type: {user.broadcaster_type || 'N/A'}</Badge>
              </Stack>
            </Center>
            {key.map((userKey) => (
              <>
                <Text sx={{paddingLeft: 2, paddingTop: 5}}>Click <UnlockIcon sx={{marginBottom: 1.5}}/> to show stream key</Text>
                  <IconButton colorScheme="facebook" aria-label="Shows the users stream key" icon={<UnlockIcon />} sx={{marginLeft: 2}} onClick={Show}>Show Stream Key</IconButton>
                  <IconButton colorScheme="facebook" aria-label="Hides the users stream key" icon={<LockIcon />} sx={{marginLeft: 2}} onClick={Hide}>Hide Stream Key</IconButton>      
                  {showKey ? <Code fontSize={['12px', '14px', '17px']} m={2}>{userKey.stream_key}</Code> : null}
              </>
            ))}
          </Box>
        ))}
      </SimpleGrid>
      
    </VStack>
    <Divider width="90%" mb={8} />
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
  </>;
}

export default Dash;
