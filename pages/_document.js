// pages/_document.js

import { ColorModeScript } from "@chakra-ui/react"
import NextDocument, { Html, Main, Head, NextScript } from "next/document"
import theme from "@/components/UI/theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}