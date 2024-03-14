import '@/styles/scss/index.scss';
import Layout from '@/components/Layout';
import { Poppins } from 'next/font/google';
import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import { AppProvider } from '@/context/AppContext';
import { useRouter } from 'next/router';

const font = Poppins({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });

export default function App({ Component, pageProps }) {
	const router = useRouter();

	const AuthMiddleware = () => {
		const isLoggedIn = localStorage.getItem('userID');
		return !isLoggedIn && router.push('/signup');
	};

	const Logout = () => {
		localStorage.removeItem('userID');
		localStorage.removeItem('userData');
		return router.push('/signup');
	};

	return (
		<>
			<Head>
				<title>Recapped</title>
				<meta
					name='description'
					content='Recapped - Recycle plastic bottles by donating to market merchants while earning sustainability points'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<CssBaseline />

			<AppProvider>
				<Layout font={font.className}>
					<Component {...pageProps} />
				</Layout>
			</AppProvider>
		</>
	);
}
