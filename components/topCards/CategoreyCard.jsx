import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  Text,
  Badge
} from '@chakra-ui/react'
import * as React from 'react'
import { FaChevronRight } from 'react-icons/fa'

export const CategoryCard = (props) => {
  const { category, rootProps } = props
  return (
      <>
    <Box
      position="relative"
      key={category.id}
      borderRadius="xl"
      overflow="hidden"
      minH={{
        base: 'sm',
        lg: 'auto',
      }}
      {...rootProps}
    >
      <Link>
        <Image
          src={category.thumbnail_url || null}
          height="full"
          objectFit="cover"
          alt='Twitch User Profile Picture'
          fallback={<Skeleton />}
        />
        <Box
          position="absolute"
          inset="0"
          bg="linear-gradient(180deg, rgba(0, 0, 0, 0) 47.92%, #000000 100%)"
          boxSize="full"
        />
        <Flex
          color="white"
          direction="column-reverse"
          position="absolute"
          inset="0"
          boxSize="full"
          px={{
            base: '4',
            md: '8',
          }}
          py={{
            base: '6',
            md: '8',
            lg: '10',
          }}
        >
          <Stack spacing="5">
            <Stack spacing="1">
              <Heading fontSize="2xl" fontWeight="extrabold">
                {category.user_name || <Text>No one you're following is live</Text>}
              </Heading>
              <Text fontSize="lg" fontWeight="medium">
                {category.title || <Text>Twitch User Description</Text>}
              </Text>
            </Stack>
            <HStack>
            <Text>Channel Views 
              <Badge ml={2}>
                {category.viewer_count || <Text>No one is watching</Text>}
              </Badge>
            </Text>
              <Icon as={FaChevronRight} />
            </HStack>
          </Stack>
        </Flex>
      </Link>
    </Box>
    </>
  )
}

