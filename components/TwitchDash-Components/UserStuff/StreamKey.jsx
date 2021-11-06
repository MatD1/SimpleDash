import axios from "axios";
import {
  Text,
  Skeleton,
  IconButton,
  Code
} from "@chakra-ui/react";
import React, {useState} from 'react';
import { useSession } from "next-auth/react";
import useSWRImmutable from 'swr/immutable'
import { LockIcon, UnlockIcon } from '@chakra-ui/icons'

const fetcher = async (url, accessToken, client) => {
    const res = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Client-Id": `xdvirywa3bq2w88tm60wtmw82zumle`,
      },
    });
    return res.data.data;
  };

export function StreamKey() {
    const client = process.env.TWITCH_CLIENT_ID
    const {data: session} = useSession();
    const [showKey, setShowKey] = useState(false);
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
            <Text sx={{paddingLeft: 2, paddingTop: 5}}>Click <UnlockIcon sx={{marginBottom: 1.5}}/> to show stream key</Text>
                <IconButton colorScheme="facebook" aria-label="Shows the users stream key" icon={<UnlockIcon />} sx={{marginLeft: 2}} onClick={Show}>Show Stream Key</IconButton>
                <IconButton colorScheme="facebook" aria-label="Hides the users stream key" icon={<LockIcon />} sx={{marginLeft: 2}} onClick={Hide}>Hide Stream Key</IconButton>      
                {showKey ? <Code fontSize={['12px', '14px', '17px']} m={2}>{userKey.stream_key}</Code> : null}
            </div>
        ))}
    </>
}





