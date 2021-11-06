import { ButtonGroup, IconButton } from '@chakra-ui/react'
import * as React from 'react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export const SocialMediaLinks = (props) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton as="a" target="_blank" rel="noopener noreferrer" href="https://github.com/MatD1/easyhsc-web" aria-label="GitHub" icon={<FaGithub fontSize="20px" />} />
  </ButtonGroup>
)