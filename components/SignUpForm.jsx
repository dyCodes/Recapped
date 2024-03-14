import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import subscription from '../assets/img/subscription-details.svg';

const SignUpForm = ({ userData, setUserData, setCurrentStep }) => {
	const [loading, setLoading] = useState(false);

	const handleSignUp = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (userData && userData.password) {
			try {
				const response = await fetch('https://recapped-api.onrender.com/api/signup', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(userData),
				});
				const data = await response.json();

				if (!data.errors) {
					localStorage.setItem('userID', data.userID);
					setCurrentStep('subscribe');
				} else {
					console.log(data?.errors[0]?.detail);
				}
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
	};

	return (
		<form onSubmit={handleSignUp}>
			<div>
				<TextField
					fullWidth
					className='signup_input'
					label='Name'
					placeholder='Please input your full name'
					value={userData.name || ''}
					onChange={(e) => setUserData({ ...userData, name: e.target.value })}
					required
				/>

				<TextField
					fullWidth
					className='signup_input'
					label='Email'
					placeholder='Please input your email'
					value={userData.email || ''}
					onChange={(e) => setUserData({ ...userData, email: e.target.value })}
					required
				/>

				<TextField
					fullWidth
					className='signup_input'
					label='Phone'
					placeholder='Please input your phone'
					value={userData.phone || ''}
					onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
				/>

				<TextField
					fullWidth
					className='signup_input'
					label='Address'
					placeholder='Please input your address'
					value={userData.address || ''}
					onChange={(e) => setUserData({ ...userData, address: e.target.value })}
					required
				/>
				<TextField
					fullWidth
					className='signup_input'
					label='Password'
					type='password'
					placeholder='Please input your password'
					value={userData.password}
					onChange={(e) => setUserData({ ...userData, password: e.target.value })}
					required
				/>
			</div>

			<div className='sub'>
				<Typography variant='h6' fontWeight={500} fontSize={18} mt={2} mb={1}>
					Subscription Details
				</Typography>
				<img src={subscription.src} alt='Subscription Details' />
			</div>

			<Button variant='contained' size='large' fullWidth sx={{ my: 2.5, py: 1.5 }} type='submit'>
				{loading ? 'Loading...' : 'Continue'}
			</Button>

			<Typography variant='body2' align='center' sx={{ mt: 2 }}>
				Already have an account?{' '}
				<a href='/login' onClick={LoginDefaultUser}>
					Login
				</a>
			</Typography>
		</form>
	);
};

const LoginDefaultUser = (e) => {
	e.preventDefault();
	localStorage.setItem('userID', 'F5C9M3W8AYN05JAXB0D3KD9KYM');
	localStorage.setItem(
		'userData',
		JSON.stringify({
			name: 'Default User',
			email: 'dycodes51@gmail.com',
			address: '12B thistle street, Amen estate, Ajah, Lagos',
			status: 'ACTIVE',
		})
	);
	window.location.href = '/';
};

export default SignUpForm;
