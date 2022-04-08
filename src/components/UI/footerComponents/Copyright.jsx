import { Text } from '@chakra-ui/layout'
import * as React from 'react'

export const Copyright = (props) => (
  <Text fontSize="sm" {...props}>
    &copy; {new Date().getFullYear()} SimpleDash, Matwebsites All rights reserved. SimpleDash is in no way affiliated with Twitch.
    <br />
    &copy; {new Date().getFullYear()} Twitch® - The Twitch Logo and name 'Twitch' are both trademarks of Twitch Interactive® and Amazon.com®,  All rights reserved.
  </Text>
)