import { Text } from '@chakra-ui/layout'
import * as React from 'react'

export const Copyright = (props) => (
  <Text fontSize="sm" {...props}>
    &copy; {new Date().getFullYear()} TwitchDash, Mat All rights reserved.
    <br />
    &copy; {new Date().getFullYear()} Twitch - The Twitch Logo and name 'Twitch' are both trademarks of Twitch.tv,  All rights reserved.
  </Text>
)