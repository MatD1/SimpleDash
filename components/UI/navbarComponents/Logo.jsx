import { chakra, Text, Icon, Button } from '@chakra-ui/react'
import * as React from 'react'
import {AiOutlineFire} from 'react-icons/ai'
import Link from 'next/link'

export const Logo = (props) => {
  return (
    <Link href="/">
      <Button leftIcon={<Icon w={9} h={9} as={AiOutlineFire} />}>MatDash</Button>
    </Link>
  )
}