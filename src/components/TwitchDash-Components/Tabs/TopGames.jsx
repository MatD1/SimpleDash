import axios from "axios";
import {
  Heading,
  Box,
  Badge,
  Center,
  Skeleton,
  SimpleGrid,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const fetcher = async (url, accessToken, client) => {
    const res = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Client-Id": `${client}`,
      },
    });
    return res.data.data;
  };

export function TopTwentyGames() {
    const client = process.env.NEXT_PUBLIC_CLIENT_ID
    const {data: session} = useSession();

    const { data: top, error: viewsError } = useSWR(
        session
          ? [
              `https://api.twitch.tv/helix/games/top?first=20`,
              session.accessToken, client,
            ]
          : null,
        fetcher
      );

      if (viewsError)
    return (
      console.log(viewsError),
      (
        <div>
          <h1>We are awhere of the error with the logged in users session not expiring at the correct time. In the mean time please re-log:{" "}
            {viewsError.message}
          </h1>
        </div>
      )
    );

    if (!top) return (<Skeleton />);

    return <>
        <SimpleGrid minChildWidth={['null', '300px']} spacing="15px">
        {top.map(
          (top) => (
            (
              <>
                <Box
                  key={top.id}
                  borderRadius="20px"
                  bgGradient="linear(to-l, #7928CA, #41d4ec)"
                  height="150px"
                  width={['320px', '360px']}
                  boxShadow="dark-lg"
                >
                <Center>
                    <Heading p={2} sx={{fontSize: '28px'}} color="white" >
                      {top.name}
                    </Heading>
                </Center>
                <Center>
                <Badge sx={{ marginLeft: 1, marginBottom: 1.5, fontSize: '25px' }} colorScheme="blue" p='-20'  borderRadius="xl">
                    🆔 {top.id}
                </Badge>
                </Center>
                </Box>
              </>
            )
          )
        )}
      </SimpleGrid>
    </>
}