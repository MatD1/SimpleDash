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
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
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

export function GetChannelEmotes() {
    const client = process.env.NEXT_PUBLIC_CLIENT_ID
    const {data: session} = useSession();

    const { data: emotes, error: emotesError } = useSWRImmutable(
        session
          ? [
            `https://api.twitch.tv/helix/chat/emotes?broadcaster_id=${session.id}`,
              session.accessToken, client,
            ]
          : null,
        fetcher,
      );

      if (emotesError)
    return (
      console.log(emotesError),
      (
        <div>
          Theres has been an error, refesh the page or re-login:{" "}
          {userError.message}
        </div>
      )
    );

    if (!emotes) return (<Skeleton />);

    return (
      <>
        <LightMode>
          <Box minChildWidth="100px" spacing="20px" maxH={'200px'} overflow="auto">
             <Stack direction={'column'} spacing={'4'}>
                 <TableContainer>
                     <Table variant='simple' overflowX="auto">
                         <TableCaption>Twitch Global Emotes</TableCaption>
                         <Thead>
                         <Tr>
                             <Th>Id</Th>
                             <Th>Emote</Th>
                             <Th>Format</Th>
                             <Th isNumeric>Scale</Th>
                         </Tr>
                         </Thead>
                         <Tbody>
                         {emotes.map((emote) => (
                             <Tr>
                                 <Td fontSize={'12px'}>{emote.id}</Td>
                                 <Td><Avatar src={emote.images.url_1x} w={7} h={7} /></Td>
                                 <Td>{emote.format}</Td>
                                 <Td isNumeric>{emote.scale}</Td>
                             </Tr>
                         ))}
                         </Tbody>
                         <Tfoot>
                         <Tr>
                             <Th>Id</Th>
                             <Th>Emote</Th>
                             <Th>Format</Th>
                             <Th isNumeric>Scale</Th>
                         </Tr>
                         </Tfoot>
                     </Table>
                 </TableContainer>
             </Stack>
       </Box> 
       </LightMode>
     </>
     )
}