// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"
// 2. Call `extendTheme` and pass your custom values
const config = {
  components: {
      Heading: {
          defaultProps: {
            colorScheme: 'teal'
          }
          }
      },
      initialColorMode: "dark",
      useSystemColorMode: false,
  
}

const theme = extendTheme({ config })
export default theme