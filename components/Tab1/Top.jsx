import axios from "axios";
import {
  Heading,
  Text,
  Box,
  Badge,
  Center,
  Skeleton,
  SimpleGrid,
  Tag,
  Stack
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import Moment from "react-moment";

const fetcher = async (url, accessToken, client) => {
    const res = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Client-Id": `xdvirywa3bq2w88tm60wtmw82zumle`,
      },
    });
    return res.data.data;
  };

export function TopTen() {
    const client = process.env.TWITCH_CLIENT_ID
    const {data: session} = useSession();

    const { data: top, error: viewsError } = useSWR(
        session
          ? [
              `https://api.twitch.tv/helix/streams?first=10`,
              session.accessToken, client,
            ]
          : null,
        fetcher,
        { revailidateOnFocus: true },
        { refreshInterval: 300000 }
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

    if (!top) return (<Skeleton />);

    return <>
        <SimpleGrid minChildWidth='300px' spacing="20px">
        {top.map(
          (top) => (
            (
              <>
                <Box
                  key={top.id}
                  
                  borderRadius="20px"
                  bgGradient="linear(to-l, #7928CA, #41d4ec)"
                  height="450px"
                  width='350px'
                  boxShadow="dark-lg"
                >
                <Center>
                    <Heading
                      color="white"
                      href={`https://twitch.tv/${top.user_name}`}
                    >
                      {top.user_name}
                    </Heading>

                    <Tag
                      sx={{ marginLeft: 1, marginBottom: 1.5 }}
                      colorScheme="blue" p='-20'
                    >
                      👀 {top.viewer_count}
                    </Tag>
                </Center>
                  <div>
                    <Text sx={{ fontSize: "24px" }} pl={4} pr={2}>
                      {top.title}
                    </Text>
                    <Text pt={2} pl={2}>
                      {top.user_name} is Playing:{" "}
                      <Badge
                        colorScheme="teal"
                        sx={{ fontSize: "20px", display: "inline" }}
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