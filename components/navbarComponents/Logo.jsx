import { chakra, Text, Icon, Button } from '@chakra-ui/react'
import * as React from 'react'
import {SiTwitch} from 'react-icons/si'
import Link from 'next/link'

export const Logo = (props) => {
  return (
    <Link href="/">
      <Button leftIcon={<Icon w={9} h={9} as={SiTwitch} />}>TwitchDash</Button>
    </Link>
  )
}