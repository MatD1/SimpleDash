import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    Code
  } from "@chakra-ui/react"

export const KeyModal = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { key, rootProps } = props
    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
  
        <Modal closeOnEsc='true' isOpen={isOpen} onClose={onClose} {...rootProps}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Twitch Stream Key</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>This is your Twitch stream key, please do not share this with anyone.</Text>
              <Code>{key?.stream_key}</Code>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
