import NextHead from 'next/head'
import {Box } from '@chakra-ui/react'
import Navbar  from '../components/UI/navbar'
import { Footer } from '../components/UI/footer'

const Layout = ({ children }) => {
    return (
    <>
        <NextHead>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        </NextHead>
        <Box as='main'>
            <Navbar />
            {children}
            <Footer />
        </Box>
    </>
    )
}

export default Layout;