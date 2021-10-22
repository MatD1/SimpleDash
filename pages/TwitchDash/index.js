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
  chakra,
  Image,
} from "@chakra-ui/react";
import { getSession } from "next-auth/react"
import React, { useState } from "react"
// import UserCards from '../../components/topCards'
import { FaArrowRight } from 'react-icons/fa'
import { CategoryCard } from '../../components/topCards/CategoreyCard'

const Twitch = ({ TwitchLive, Sk, User }) => {
  const [showKey, setShowKey] = useState(false);
  const Show = () => setShowKey(true);
  const Hide = () => setShowKey(false);

  if (!Twitch) {
    return <div>Loading...</div>;
  }
  return (
      <><>
      <VStack>
        {User?.map((us) => (
          console.log(User),
          <Box key={us.id}>
            <Center>
              <Heading p="4">{us.display_name}</Heading>
              <Heading>{us.id}</Heading>
              <Badge
                fontSize="15px"
                colorScheme="purple"
              >View Count {us.view_count}
              </Badge>
            </Center>
          </Box>
        ))}
        {Sk.map((key) => (
          <div key={key.id}>
            <Button margin={2} onClick={Show}>Show Stream Key</Button>
            <Button margin={2} onClick={Hide}>Hide Stream Key</Button>
            {showKey ? <Text>{key.stream_key}</Text> : null}
          </div>
        ))}
      </VStack>
      <Flex
        bg={useColorModeValue("#F9FAFB", "gray.600")}
        p={50}
        w="full"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          maxW="xs"
          mx="auto"
          bg={useColorModeValue("white", "gray.800")}
          shadow="lg"
          rounded="lg"
        >
          <Box px={4} py={2}>
            {TwitchLive.map((tl) => {
              console.log(TwitchLive),
                <div key={tl.id}>
                  <a>{tl.user_name}</a>
                  <chakra.h1
                    color={useColorModeValue("gray.800", "white")}
                    fontWeight="bold"
                    fontSize="3xl"
                    textTransform="uppercase"
                  >
                    {tl.user_name}
                  </chakra.h1>
                  <chakra.p
                    mt={1}
                    fontSize="sm"
                    color={useColorModeValue("gray.600", "gray.400")}
                  >{tl.description}
                  </chakra.p>
                </div>;
            })}
          </Box>
          {TwitchLive.map((tl) => (
            <div key={tl.id}>
              <Image
                h={48}
                w="full"
                fit="cover"
                mt={2}
                src={tl.thumbnail_url}
                alt="Twitch live stream thumbnail" />

              <Flex
                alignItems="center"
                justifyContent="space-between"
                px={4}
                py={2}
                bg="gray.900"
                roundedBottom="lg"
              >
                <chakra.h1 color="white" fontWeight="bold" fontSize="lg">
                  {tl.viewer_count}
                </chakra.h1>
                <chakra.button
                  px={2}
                  py={1}
                  bg="white"
                  fontSize="xs"
                  color="gray.900"
                  fontWeight="bold"
                  rounded="lg"
                  textTransform="uppercase"
                  _hover={{
                    bg: "gray.200",
                  }}
                  _focus={{
                    bg: "gray.400",
                  }}
                >
                  Add to cart
                </chakra.button>
              </Flex>
            </div>
          ))}
        </Box>
      </Flex>
      </>
      <div>
        <Box
          maxW="7xl"
          mx="auto"
          px={{
            base: '4',
            md: '8',
            lg: '12',
          }}
          py={{
            base: '6',
            md: '8',
            lg: '12',
          }}
        >
          <Stack
            spacing={{
              base: '6',
              md: '8',
              lg: '12',
            }}
          >
            <Flex
              justify="space-between"
              align={{
                base: 'start',
                md: 'center',
              }}
              direction={{
                base: 'column',
                md: 'row',
              }}
            >
              <Heading size="lg">Season's Favorites</Heading>
              <HStack
                spacing={{
                  base: '2',
                  md: '3',
                }}
              >
                <Link
                  fontSize={{
                    base: 'md',
                    md: 'lg',
                  }}
                  fontWeight="bold"
                  color={useColorModeValue('blue.500', 'blue.300')}
                >
                  See all categories
                </Link>
                <Icon
                  as={FaArrowRight}
                  color={useColorModeValue('blue.500', 'blue.300')}
                  fontSize={{
                    base: 'sm',
                    md: 'md',
                  }} />
              </HStack>
            </Flex>
            <SimpleGrid
              columns={{
                base: 1,
                md: 2,
                lg: 3,
              }}
              gap={{
                base: '8',
                lg: '16',
              }}
            >
              {TwitchLive?.map((tv) => {
                return (
                <CategoryCard key={tv.id} category={tv} />
                )
              })}
            </SimpleGrid>
          </Stack>
        </Box>
      </div>
      </>
  );
};

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

