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
} from "@chakra-ui/react";
import { useSession } from "next-auth/react"
import useSWR from 'swr'



const fetcher = (url) => {
const { data: session, status } = useSession()
    axios
      .get(url, { 
        headers: { 
          'Authorization': `Bearer ${session.accessToken}`,
          'Client-Id': `${process.env.TWITCH_CLIENT_ID}`
        }})
      .then((res) => res.data);
        }
     
function Dash () {
  const { data, error } = useSWR(`https://api.twitch.tv/helix/streams/key?broadcaster_id=630124067`,fetcher)
  
  if (error) console.log(error);
  if (data) console.log(data);

  return (
    <VStack>
      <Text>test</Text>
    </VStack>
  )

}


export default Dash