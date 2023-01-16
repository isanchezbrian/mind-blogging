import '../styles/globals.css'
import Layout from '../components/layout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';


export default function App({ Component, pageProps }) {
  return (
    // <AuthProvider>
      <Layout>
        <ToastContainer limit={1}/>
        <Component {...pageProps} />
      </Layout>
    // </AuthProvider>
  )
}
