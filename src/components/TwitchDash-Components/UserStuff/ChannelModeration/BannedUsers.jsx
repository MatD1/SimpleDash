import axios from "axios";
import {
  Text,
  Box,
  Badge,
  Center,
  Skeleton,
  Stack,
  LightMode,
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

export function Banned() {
    const client = process.env.NEXT_PUBLIC_CLIENT_ID
    const {data: session} = useSession();

    const { data: bans, error: bansError } = useSWRImmutable(
        session
          ? [
            `https://api.twitch.tv/helix/moderation/banned?broadcaster_id=${session.id}`,
              session.accessToken, client,
            ]
          : null,
        fetcher,
      );

      if (bansError)
    return (
      console.log(bansError),
      (
        <div>
          Theres has been an error, refesh the page or re-login:{" "}
          {userError.message}
        </div>
      )
    );

    if (!bans) return (<Skeleton />);

     return (
     <>
     <Center>
       <LightMode>
      <Box maxH="200px" overflowY="scroll">
       {bans.map((ban) => (
          <>      
          <Box mb={5} borderRadius="20px" height="270px" maxh="160px" width={{base: '330px', sm: '330px', md: '400px', lg: '400px'}} boxShadow="lg" bgGradient="linear(to-l, #ff1b6b, #45caff)">
            <Center>
              <Stack pt={'4'} direction={'column'} spacing={'2'}>
                  <Badge key={ban.id} borderRadius="md" fontSize={['10px', '13px']} sx={{ marginTop: 2}} colorScheme="twitter">Banned Users Id 🏷️ : {ban.user_id || 'No Bans'}</Badge>
                  <Badge key={ban.id} borderRadius="md" fontSize={['10px', '13px']} sx={{ marginTop: 2}} colorScheme="green">Banned Users Name: {ban.user_name || 'No Bans'}</Badge>
                  <Badge key={ban.id} borderRadius="md" fontSize={['10px', '13px']} sx={{ marginTop: 2}} colorScheme="green">Banned Users Name: {ban.user_login || 'No Bans'}</Badge>
                  <Badge key={ban.id} borderRadius="md" fontSize={['10px', '13px']} sx={{ marginTop: 2}} colorScheme="green"><Text>Reason For Ban: {ban.reason || 'No Bans'}</Text></Badge>
                  <Badge key={ban.id} borderRadius="md" fontSize={['10px', '13px']} sx={{ marginTop: 2}} colorScheme="green">Ban Expires At: <Moment local format="MM:HH DD/MM/YYYY">{ban.expires_at || 'No Bans'}</Moment></Badge>
                  <Badge key={ban.id} borderRadius="md" fontSize={['10px', '13px']} sx={{ marginTop: 2}} colorScheme="green">Id for Mod That Banned User : {ban.moderator_id || 'No Bans'}</Badge>
                  <Badge key={ban.id} borderRadius="md" fontSize={['10px', '13px']} sx={{ marginTop: 2}} colorScheme="green">Login for Mod That Banned User: {ban.moderator_login || 'No Bans'}</Badge>
                  <Badge key={ban.id} borderRadius="md" fontSize={['10px', '13px']} sx={{ marginTop: 2}} colorScheme="green">Username for Mod That Banned User: {ban.moderator_name || 'No Bans'}</Badge>
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