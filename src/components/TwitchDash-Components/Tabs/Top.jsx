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

export function TopTen() {
    const client = process.env.NEXT_PUBLIC_CLIENT_ID
    const {data: session} = useSession();

    const { data: top, error: viewsError } = useSWR(
        session
          ? [
              `https://api.twitch.tv/helix/streams?first=10`,
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
        <SimpleGrid minChildWidth='325px' spacing="20px">
        {top.map(
          (top) => (
            (
              <>
                <Box
                  key={top.id}
                  borderRadius="20px"
                  bgGradient="linear(to-l, #7928CA, #41d4ec)"
                  height="450px"
                  width={['320px', '360px']}
                  boxShadow="dark-lg"
                >
                <Center>
                    <Heading
                      color="white"
                      href={`https://twitch.tv/${top.user_name}`}
                    >
                      {top.user_name}
                    </Heading>
                </Center>
                <Center>
                <Badge
                      sx={{ marginLeft: 1, marginBottom: 1.5, marginTop: 1.5, fontSize: '23px' }}
                      colorScheme="blue" borderRadius="xl"
                    >
                      👀 {top.viewer_count}
                    </Badge>
                </Center>
                  <div>
                    <Text sx={{ fontSize: "24px" }} pl={4} pr={2}>
                      {top.title}
                    </Text>
                    <Text pt={2} pl={2}>
                      {top.user_name} is Playing:{" "}
                      <Badge
                        colorScheme="teal"
                        sx={{ fontSize: "15px", display: "inline" }}
                      >
                        {top.game_name}
                      </Badge>
                    </Text>
                    <Text pt={2} pl={2}>
                      {top.user_name} started streaming @:{" "}
                      <Badge
                        colorScheme="teal"
                        sx={{ fontSize: "20px", display: "inline" }}
                      >
                        <Moment local format="MM:HH:SS DD/MM/YYYY ">
                          {top.started_at}
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