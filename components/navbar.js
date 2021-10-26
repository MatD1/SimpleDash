import {
  Box,
  Button,
  Flex,
  HStack,
  useColorModeValue as mode,
  VisuallyHidden,
  useColorMode
} from "@chakra-ui/react";
import Head from 'next/link'
import { Logo } from "./navbarComponents/Logo";
import { MobileNav } from "./navbarComponents/MobileNav";
import { NavLink } from "./navbarComponents/NavLink";
import { useSession, signIn, signOut } from "next-auth/react";
import ColorMode from "./colorMode";


const NavBar = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <>
      <Box>
        <Box as="header" bg={mode("white", "gray.800")} borderBottomWidth="1px">
          <Box
            maxW="7xl"
            mx="auto"
            py="4"
            px={{
              base: "6",
              md: "8",
            }}
          >
            <Flex as="nav" justify="space-between">
              <HStack spacing="8">
                <Box as="a" href="#" rel="home">
                  <VisuallyHidden>TwitchDash</VisuallyHidden>
                  <Logo h="6" iconColor="blue.500" />
                </Box>
                <HStack
                  display={{
                    base: "none",
                    lg: "flex",
                  }}
                  spacing="8"
                >
                <Button bgGradient="linear(to-r, red.200, pink.500)" _hover={{bgGradient: "linear(to-r, blue.200, pink.500)"}}><a href="/Dash">Dashboard</a></Button>
                </HStack>
              </HStack>
              <Flex align="center">
                <HStack
                  spacing="8"
                  display={{
                    base: "none",
                    md: "flex",
                  }}
                >
                  <ColorMode />
                  <NavLink.Desktop onClick={() => signOut()}>{session.user.name || session.user.email}</NavLink.Desktop>
                </HStack>
                <Box ml="5">
                  <MobileNav />
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>
      </>
    );
  }
  return (
    <Box>
          <Box as="header" bg={mode("white", "gray.800")} borderBottomWidth="1px">
            <Box
              maxW="7xl"
              mx="auto"
              py="4"
              px={{
                base: "6",
                md: "8",
              }}
            >
              <Flex as="nav" justify="space-between">
                <HStack spacing="8">
                  <Box as="a" href="#" rel="home">
                    <VisuallyHidden>TwitchDash</VisuallyHidden>
                    <Logo h="6" iconColor="blue.500" />
                  </Box>
                  <HStack
                    display={{
                      base: "none",
                      lg: "flex",
                    }}
                    spacing="8"
                  >
                  </HStack>
                </HStack>
                <Flex align="center">
                  <HStack
                    spacing="8"
                    display={{
                      base: "none",
                      md: "flex",
                    }}
                  >
                  <ColorMode />
                    <NavLink.Desktop onClick={() => signIn()}>Log in</NavLink.Desktop>
                  </HStack>
                  <Box ml="5">
                    <MobileNav />
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Box>
  )
};


export default NavBar;