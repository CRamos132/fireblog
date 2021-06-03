import NavBar from '../components/NavBar'
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Toaster />
    </>
  )
}

export default MyApp
