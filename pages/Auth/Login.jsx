import {
    Flex,
    Box,
    Icon,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Center,
    VStack,
  } from '@chakra-ui/react';
  import { getProviders, signIn, useSession, signOut } from "next-auth/react"
  import { BsTwitch } from 'react-icons/bs'
  
  export default function Login({ providers }) {
    const { data: session, status } = useSession()

    if (status === "loading") {
      return (
        <VStack>
          <Heading>Loading...</Heading>
        </VStack>
      )
    }

    if (status === "authenticated") {
      return (
        <>
        <Flex
          minH={'70vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={5} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'3xl'}>Already signed in with your Twitch account as {session.user.name || session.user.email}</Heading>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}>
              <Stack spacing={4}>
                <Center>
                    <Button
                    bg={'blue.400'}
                    color={'white'}
                    onClick={() => signOut()}
                    rightIcon={<BsTwitch />}
                    _hover={{
                        bg: 'blue.500',
                    }}>
                        Sign out of
                    </Button>
                </Center>
              </Stack>
            </Box>
          </Stack>
        </Flex>
        </>
      );
    }

    return (
      <>
        {Object.values(providers).map((provider) => (
      <Flex
        minH={'70vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={5} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'3xl'}>Sign in to your Twitch account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
                    <div key={provider.name}>
                        <Center>
                            <Button
                            bg={'blue.400'}
                            color={'white'}
                            onClick={() => signIn(provider.id)}
                            rightIcon={<BsTwitch />}
                            _hover={{
                                bg: 'blue.500',
                            }}>
                                Sign in with {provider.name}
                            </Button>
                        </Center>
                    </div>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      ))}
      </>
    );
  }

  export async function getServerSideProps(context) {
    const providers = await getProviders()
    return {
      props: { providers },
    }
  }