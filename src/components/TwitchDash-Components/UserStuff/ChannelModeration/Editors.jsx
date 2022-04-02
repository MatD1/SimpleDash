import axios from "axios";
import {
  Heading,
  Box,
  Badge,
  Center,
  Skeleton,
  SimpleGrid,
  Stack,
  Avatar,
  LightMode,
  Container
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useSWRImmutable from 'swr/immutable'
import Moment from "react-moment";

const fetcher = async (url, accessToken, client) => {
    const res = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Client-Id": `${client}`,
      },
    });
    return res.data.data;
  };

export function EditorsTab() {
    const client = process.env.NEXT_PUBLIC_CLIENT_ID
    const {data: session} = useSession();

    const { data: editors, error: userError } = useSWRImmutable(
        session
          ? [
            `https://api.twitch.tv/helix/channels/editors?broadcaster_id=${session.id}`,
              session.accessToken, client,
            ]
          : null,
        fetcher,
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

    if (!editors) return (<Skeleton />);

     return (
     <>
     <Center>
       <LightMode>
      <Box maxH="200px" overflowY="auto">
       {editors.map((editor) => (
          <>      
          <Box mb={5} borderRadius="20px" height="160px" maxh="160px" width={{base: '330px', sm: '330px', md: '400px', lg: '400px'}} boxShadow="lg" bgGradient="linear(to-l, #ff1b6b, #45caff)">
            <Center>
              <Stack pt={'4'} direction={'column'} spacing={'5'}>
                  <Badge key={editor.id} borderRadius="md" fontSize={['13px', '15px']} sx={{ marginTop: 2}} colorScheme="twitter">User Id 🏷️ : {editor.user_id || 'No Mods'}</Badge>
                  <Badge key={editor.id} borderRadius="md" fontSize={['13px', '15px']} sx={{ marginTop: 2}} colorScheme="green">Editors User Name: {editor.user_name || 'No Mods'}</Badge>
                  <Badge key={editor.id} borderRadius="md" fontSize={['13px', '15px']} sx={{ marginTop: 2}} colorScheme="green">Role added At: <Moment local format="MM:HH DD/MM/YYYY">{editor.created_at || 'No Mods'}</Moment></Badge>
              </Stack>
            </Center>
          </Box>
          </>
         ))}
        </Box>
        </LightMode>
      </Center>
    </>
    )
}