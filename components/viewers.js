import {useQuery} from 'react-query'
import axios from 'axios'
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
import { getSession } from "next-auth/react"
import useSWR from 'swr'



async function fetchPosts(ctx) {
    const session = await getSession({
      req: ctx.req,
    });
  const {data} = await axios.get(`https://api.twitch.tv/helix/streams/followed?user_id=${session.id}`,
  {
    headers: {
      "Authorization": `Bearer ${session.accessToken}`,
      "Client-Id": `xdvirywa3bq2w88tm60wtmw82zumle`,
    },
  })    
  return data
}
     

function Viewers(){
  const {data, error, isError, isLoading } = useQuery('posts', fetchPosts) 
  // first argument is a string to cache and track the query result
  if(isLoading){
      return <div>Loading...</div>
  }
  if(isError){
    console.log(error);
      return <div>Error! {error.message}</div>
  }

  return(
      <div className='container'>
      <h1>Posts</h1>
      {
          data.data.map((post) => (
            <Badge sx={{marginLeft: 1, marginBottom: 1.5}} colorScheme="blue">👀 {post.viewer_count}</Badge>
          ))
      }

      </div>
  )
}

export default Viewers
