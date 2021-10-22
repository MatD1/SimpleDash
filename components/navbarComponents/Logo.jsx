import { chakra, Text, Icon, Button } from '@chakra-ui/react'
import * as React from 'react'
import {FcAddressBook, FcExternal} from 'react-icons/fc'
import Link from 'next/link'

export const Logo = (props) => {
  return (
    <Link href="/">
      <Button leftIcon={<Icon w={10} h={10} as={FcAddressBook} />}>EasyHSC</Button>
    </Link>
  )
}
