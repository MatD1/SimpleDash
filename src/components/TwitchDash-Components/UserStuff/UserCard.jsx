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
import { StreamKey } from "./StreamKey";

const fetcher = async (url, accessToken, client) => {
    const res = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Client-Id": `${client}`,
      },
    });
    return res.data.data;
  };

export function UserCard() {
    const client = process.env.NEXT_PUBLIC_CLIENT_ID
    const {data: session} = useSession();

    const { data: user, error: userError } = useSWRImmutable(
        session
          ? [
            `https://api.twitch.tv/helix/users?id=${session.id}`,
              session.accessToken, client,
            ]
          : null,
        fetcher
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

    if (!user) return (<Skeleton />);

    return (
    <>
    <Center>
       <LightMode>
         <Container spacing="20px" >
        {user.map((user) => (
          <Box key={user.id} m={[1, 2, 5]}  borderColor="black" borderRadius="20px" height="280px" width={[320, 400, 500]} boxShadow="xl">
          <Center>
            <Stack direction="row">
              <Avatar sx={{marginTop: 2.5, marginLeft: 2}} src={user.profile_image_url} />
              <Heading pt="5" sx={{fontSize: '20px'}}>Hi! 👋, {user.display_name}</Heading>
            </Stack>
          </Center>
            <Center>
              <Stack>
                <Badge borderRadius="md" fontSize={['11.5px', '15px']} sx={{marginTop: 2}} colorScheme="facebook">User Id 🏷️ : {user.id}</Badge>
                <Badge borderRadius="md" fontSize={['11.5px', '15px']} sx={{marginLeft: 5, marginTop: 2}} colorScheme="facebook">Total channel views 👀 {user.view_count}</Badge>
                <Badge borderRadius="md" fontSize={['11.5px', '15px']} sx={{marginLeft: 5, marginTop: 2}} colorScheme="facebook">Partnership type: {user.broadcaster_type || 'N/A'}</Badge>
              </Stack>
            </Center>
              <StreamKey />
          </Box>
        ))}
        </Container> 
        </LightMode>
      </Center>
    </>
    )
}