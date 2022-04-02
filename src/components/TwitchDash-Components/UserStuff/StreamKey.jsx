import axios from "axios";
import {
  Text,
  Skeleton,
  IconButton,
  Code,
  Icon
} from "@chakra-ui/react";
import React, {useState} from 'react';
import { useSession } from "next-auth/react";
import useSWRImmutable from 'swr/immutable'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

const fetcher = async (url, accessToken, client) => {
    const res = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Client-Id": `${client}`,
      },
    });
    return res.data.data;
  };

export function StreamKey() {
    const client = process.env.NEXT_PUBLIC_CLIENT_ID
    const {data: session} = useSession();

    const [showKey, setShowKey] = React.useState(false)
    const handleToggle = () => setShowKey(!showKey)

    const Show = () => setShowKey(true);
    const Hide = () => setShowKey(false);

    const { data: key, error: keyError } = useSWRImmutable(
        session
          ? [
            `https://api.twitch.tv/helix/streams/key?broadcaster_id=${session.id}`,
              session.accessToken, client,
            ]
          : null,
        fetcher,
      );

      if (keyError)
    return (
      console.log(keyError),
      (
        <div>
          Theres has been an error, refesh the page or re-login:{" "}
          {keyError.message}
        </div>
      )
    );

    if (!key) return (<Skeleton />);

    return <>
          {key.map((userKey) => (
            <div>
            <Text sx={{paddingLeft: 2, paddingTop: 5}}>Click <Icon as={BsEye} sx={{marginBottom: 1.5}}/> to show stream key</Text>
                <IconButton colorScheme="green" aria-label="Shows the users stream key" icon={<BsEye />} sx={{marginLeft: 2}} onClick={handleToggle}>
                {showKey ? <Code fontSize={['12px', '14px', '17px']} m={2}>{userKey.stream_key}</Code> : null}
                </IconButton>  
                {showKey ? <Code fontSize={['12px', '14px', '17px']} m={2}>{userKey.stream_key}</Code> : null}
            </div>
        ))}
    </>
}





