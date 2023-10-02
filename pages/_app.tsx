import '../styles/globals.css'
import type {AppProps} from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'
import dynamic from 'next/dynamic'
import { ChakraProvider } from '@chakra-ui/react'

const App = ({Component, pageProps}: AppProps) => {
    return (
        <ChakraProvider>
            <Component {...pageProps} />
        </ChakraProvider>
    )

}

export default dynamic(() => Promise.resolve(App), {
    ssr: false
})