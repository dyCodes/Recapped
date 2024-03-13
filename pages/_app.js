import '@/styles/globals.css';
import { Poppins } from 'next/font/google';
import Head from 'next/head';

const font = Poppins({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });

export default function App({ Component, pageProps }) {
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

			<div className={font.className}>
				<Component {...pageProps} />
			</div>
		</>
	);
}
