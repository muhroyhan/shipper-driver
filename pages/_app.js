import { SSRProvider } from 'react-bootstrap'
import '../styles/globals.css'
import "antd/dist/antd.css";

function MyApp({ Component, pageProps }) {
    return <SSRProvider>
        <Component {...pageProps} />
    </SSRProvider>
}

export default MyApp
