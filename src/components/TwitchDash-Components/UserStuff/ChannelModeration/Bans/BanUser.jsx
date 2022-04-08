import React from 'react'
import { useForm } from 'react-hook-form';
import useSWRImmutable from 'swr/immutable'
import { useSession } from "next-auth/react";
import axios from 'axios';
import { Button, Text, VStack, Input, FormLabel, Heading, FormControl, HStack, PinInput, PinInputField } from '@chakra-ui/react';

const fetcher = async (url, accessToken, client) => {
    const res = await axios.get(url, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Client-Id": `${client}`,
      },
    });
    return res.data.data;
  };



const BanUser = () => {
    const client = process.env.NEXT_PUBLIC_CLIENT_ID
    const {data: session} = useSession();

   // React Hook Form
   const { register, reset, handleSubmit, formState, formState: { errors, isSubmitSuccessful } } = useForm({
    defaultValues: {
      duration: "",
      reason: "",
      user_id: ""
    }
  });
  
  const onSubmit = data => {
      console.log(data)
    fetch(`https://api.twitch.tv/helix/moderation/bans?broadcaster_id=${session.id}&moderator_id=${session.id}`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${session.accessToken}`,
              "Client-Id": `${client}`
      },
          body: JSON.stringify({"data":data })
      })
   console.log(data);
  console.log(errors);
  }
  const [submittedData, setSubmittedData] = React.useState({});

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({duration: "",
      reason: "",
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
        <Heading>Ban user</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel><Text>Ban Duration: </Text></FormLabel>
              <Input 
              placeholder="Enter ban time in seconds"
              type="number" 
              {...register("duration", {min: 1, maxLength: 12})}
              />
            </FormControl>
            <FormLabel><Text>Ban Reason:</Text></FormLabel>
            <Input
            type="text"
            placeholder="Enter reason for ban"
            {...register("reason", {required: true, min: 1, maxLength: 80})}
            />
            
            <FormControl>
              <FormLabel><Text>Ban User by ID: </Text></FormLabel>
                <Input
                type="number"
                placeholder='Input A Users ID'
                {...register("user_id", {required: true, min: 1})}
                >
                </Input>
            </FormControl>
            <Button type='submit' p="2" m="2" colorScheme="green">Submit Ban</Button>
      </form>
    </VStack>
    )
}

export default BanUser  