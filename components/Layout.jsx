import React from 'react';
import { Container, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useRouter } from 'next/router';

const Layout = ({ font, children }) => {
	const router = useRouter();

	const getCurrentPage = () => {
		if (router.pathname == '/') {
			return 'home';
		} else {
			return router.pathname.replace('/', '');
		}
	};

	return (
		<div id={getCurrentPage()} className={'app ' + font}>
			<main>{children}</main>

			{router.pathname !== '/signup' && (
				<div className='footer_navbar'>
					<Container maxWidth='sm' className='container'>
						<MuiLink href='/' component={Link} underline='none'>
							<HomeOutlinedIcon className='navIcon' />
						</MuiLink>

						<MuiLink href='/marketplace' component={Link} underline='none'>
							<StorefrontOutlinedIcon className='navIcon' />
						</MuiLink>

						<MuiLink href='/transactions' component={Link} underline='none'>
							<HistoryOutlinedIcon className='navIcon' />
						</MuiLink>

						<MuiLink href='/settings' component={Link} underline='none'>
							<SettingsOutlinedIcon className='navIcon' />
						</MuiLink>
					</Container>
				</div>
			)}
		</div>
	);
};

export default Layout;
