import React from 'react'
import { useForm } from 'react-hook-form';
import useSWRImmutable from 'swr/immutable'
import { useSession } from "next-auth/react";
import axios from 'axios';
import { Button, Text, VStack, Input, FormLabel, Heading, FormControl, Select } from '@chakra-ui/react';

const fetcher = async (url, accessToken, client) => {
    const res = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Client-Id": `${client}`,
      },
    });
    return res.data.data;
  };



const UnbanUser = () => {
    const client = process.env.NEXT_PUBLIC_CLIENT_ID
    const {data: session} = useSession();

    // React Hook Form
    const { register, reset, handleSubmit, formState, formState: { errors, isSubmitSuccessful } } = useForm({
      defaultValues: {
        broadcaster_id: "",
        moderator_id: "",
        user_id: ""
      }
    });
    
    const onSubmit = data => {

      fetch(`https://api.twitch.tv/helix/moderation/bans`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`,
                "Client-Id": `${client}`
        },
            body: JSON.stringify(data)
        })
     console.log(data);
    console.log(errors);
    }
    const [submittedData, setSubmittedData] = React.useState({});

    React.useEffect(() => {
      if (formState.isSubmitSuccessful) {
        reset({broadcaster_id: "",
        moderator_id: "",
        user_id: ""})
      }
    },[formState, submittedData, reset])
    // End React Hook Form

    const { data: bans, error: bansError } = useSWRImmutable(
        session
          ? [
            `https://api.twitch.tv/helix/moderation/banned?broadcaster_id=${session.id}`,
              session.accessToken, client,
            ]
          : null,
        fetcher,
      );

      const { data: users, error: userError } = useSWRImmutable(
        session
          ? [
            `https://api.twitch.tv/helix/users?id=${session.id}`,
              session.accessToken, client,
            ]
          : null,
        fetcher
      );

      if (bansError, userError)
    return (
      console.log(bansError || userError),
      (
        <div>
          Theres has been an error, refesh the page or re-login:{" "}
          {bansError.message || userError.message}
        </div>
      )
    );

    if (!bans|| !users) return (
        <div>loading...</div>
        );

    return (
      <VStack>
      <Heading>Unban a banned user</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
          <FormLabel><Text>Broadcaster Id: </Text></FormLabel>
            <Select 
            placeholder="Select Your ID" 
            type="number"
            {...register("broadcaster_id", {required: true, min: 1, maxLength: 80})}
            >
              {users.map((user) =>(
                <option>{user.id}</option>
              ))}
            </Select>

             <FormLabel><Text>Moderator or Your ID</Text></FormLabel>     
              <Input type="number" placeholder="moderator id" {...register("moderator_id", {required: true, min: 1, maxLength: 100})} />

             <FormLabel><Text>Users ID to unban</Text></FormLabel>   
              <Select
              type="number" 
              placeholder="Select Banned Users ID" 
              {...register("user_id", {required: true, min: 1})}
              >
                {bans.map((ban) =>( 
                  <>
                    <option value={ban.user_id}>{ban.user_id}</option><Text>{ban.user_name}</Text>
                  </>
                ))}
              </Select>
          </FormControl>
        <Button type="submit" colorScheme='green' mt="2">Unban User</Button>
  </form>
  </VStack>
    )
}

export default UnbanUser;