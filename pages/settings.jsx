import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import profilePhoto from '@/assets/img/profile.png';
import { useRouter } from 'next/router';

const Settings = () => {
	const router = useRouter();

	let jsonData = typeof window !== 'undefined' ? window.localStorage.getItem('access') : false;
	const userData = JSON.parse(jsonData);

	const Logout = () => {
		localStorage.removeItem('userID');
		localStorage.removeItem('userData');
		return router.push('/signup');
	};

	return (
		<Container maxWidth='sm' className='container'>
			<Typography variant='h5' component='h1' align='center' mb={3} fontWeight='bold'>
				Settings
			</Typography>

			<div className='profile_section'>
				<div className='profile_header'>
					<div className='_flex'>
						<img src={profilePhoto.src} alt='Current User' width='70px' />
						<h3 style={{ marginRight: '4px', fontSize: '16px' }}>{userData?.name ?? 'Default User'}</h3>
					</div>

					<Button variant='contained' color='error' startIcon={<LogoutIcon />} onClick={Logout}>
						Logout
					</Button>
				</div>

				<div className='stats'>
					<div className='stat'>
						<p className='_mb0'>Total bottles donated</p>
						<b>625 bottles</b>
					</div>

					<div className='stat'>
						<p className='_mb0'>Total sustainability points</p>
						<b>62.5 points</b>
					</div>

					<div className='stat'>
						<p className='_mb0'>Quality requirements</p>
						<b>Excellent</b>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Settings;
