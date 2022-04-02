import axios from "axios";
import {
  Heading,
  Text,
  Box,
  Badge,
  Center,
  Skeleton,
  SimpleGrid,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
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

export function Followed() {
    const client = process.env.NEXT_PUBLIC_CLIENT_ID
    const {data: session} = useSession();

    const { data: following, error: viewsError } = useSWR(
        session
          ? [
              `https://api.twitch.tv/helix/streams/followed?user_id=${session.id}`,
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

    if (!following) return (<Skeleton />);

    return <>
        <SimpleGrid minChildWidth="300px" spacing="40px">
        {following.map(
          (follow) => (
            (
              <>
                <Box
                  key={follow.id}
                  ml={4}
                  mr={4}
                  mb={2}
                  borderRadius="20px"
                  bgGradient="linear(to-l, #7928CA, #41d4ec)"
                  height="450px"
                  boxShadow="dark-lg"
                >
                  <Center>
                    <Heading
                      color="white"
                      href={`https://twitch.tv/${follow.user_name}`}
                    >
                      {follow.user_name}
                    </Heading>
                  </Center>
                  <Center>
                <Badge
                      sx={{ marginLeft: 1, marginBottom: 1.5, marginTop: 1.5, fontSize: '23px' }}
                      colorScheme="blue" borderRadius="xl"
                    >
                      👀 {follow.viewer_count}
                    </Badge>
                </Center>
                  <div>
                    <Text sx={{ fontSize: "24px" }} pl={4} pr={2}>
                      {follow.title}
                    </Text>
                    <Text pt={2} pl={2}>
                      {follow.user_name} is Playing:{" "}
                      <Badge
                        colorScheme="teal"
                        sx={{ fontSize: "20px", display: "inline" }}
                      >
                        {follow.game_name}
                      </Badge>
                    </Text>
                    <Text pt={2} pl={2}>
                      {follow.user_name} started streaming @:{" "}
                      <Badge
                        colorScheme="teal"
                        sx={{ fontSize: "20px", display: "inline" }}
                      >
                        <Moment local format="MM:HH DD/MM/YYYY ">
                          {follow.started_at}
                        </Moment>
                      </Badge>
                    </Text>
                  </div>
                </Box>
              </>
            )
          )
        )}
      </SimpleGrid>
    </>
}