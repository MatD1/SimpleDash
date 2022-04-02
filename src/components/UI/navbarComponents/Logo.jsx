import { chakra, Text, Icon, Button } from '@chakra-ui/react'
import * as React from 'react'
import {FaFire} from 'react-icons/fa'
import Link from 'next/link'

export const Logo = (props) => {
  return (
    <Link href="/">
      <Button leftIcon={<Icon w={7} h={7} as={FaFire} />}>SimpleDash</Button>
    </Link>
  )
}