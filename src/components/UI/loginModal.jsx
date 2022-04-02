import {Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, useDisclosure, Heading, Divider} from '@chakra-ui/react'
import { useSession, signIn, signOut } from "next-auth/react"

function LoginModal() {
    const {data: session, status} = useSession();
    const { isOpen, onOpen, onClose } = useDisclosure()

    if (status === "loading") {
        return (
            <div>Loading...</div>
        )
    }

    if (status === "unauthenticated") {
    return (
      <>
        <Button colorScheme={'green'} ml={['4', '3']} onClick={onOpen}>Login</Button>
  
        <Modal  isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent m={['4', '3']}>
            <ModalHeader>Welcome To SimpleDash!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>
              SimpleDash is a lite weight custom Twitch® Dashboard!
                <Divider mt={2} mb={2} />
                <Text>
                By logging in to this web app with Twitch® you consent to us using the returned data to show your dashboard. 
                </Text>
              </Text>
            </ModalBody>
  
            <ModalFooter>
                <Button mr={3} onClick={() => signIn()}>login</Button>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
      return (
        <>
        <Button onClick={onOpen}>Logout</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Welcome To SimpleDash!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                    <Text sx={{fontSize: '20px'}}>
                       Whats up! 👋 <Heading sx={{fontSize: '24px', display: 'inline'}}>{session.user.name || session.user.email || null}</Heading>
                    </Text>
            </ModalBody>
  
            <ModalFooter>
                <Button mr={3} onClick={() => signOut()}>Log Out</Button>
              <Button mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      )
}
export default LoginModal