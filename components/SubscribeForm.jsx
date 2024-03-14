import { Alert, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import subscription from '../assets/img/subscription-details.svg';
import { useRouter } from 'next/router';

const SubscribeForm = ({ userData }) => {
	const [paymentData, setPaymentData] = useState({ cardNo: '', expirationDate: '', securityCode: '' });
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState({ type: '', message: '' });
	const router = useRouter();

	const handleSubscribe = async (e) => {
		e.preventDefault();
		setLoading(true);
		setStatus({ type: '', message: '' });

		if (paymentData && paymentData.securityCode) {
			try {
				const userID = localStorage.getItem('userID');
				const url = 'https://recapped-api.onrender.com/api/subscribe/' + userID;
				const response = await fetch(url, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(userData),
				});
				const data = await response.json();

				if (!data.errors) {
					userData.password = null;
					localStorage.setItem('userData', JSON.stringify({ ...userData, status: data.status }));
					setStatus({ type: 'success', message: 'Subscription successful! Redirecting...' });

					// Redirect to home page
					setTimeout(() => {
						router.push('/');
					}, 3000);
				} else {
					console.log(data);
					setStatus({ type: 'error', message: data?.errors[0].detail });
				}
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.log(error);
				setStatus({ type: 'error', message: 'Something went wrong! Please try again.' });
			}
		}
	};

	return (
		<form id='subscribe' onSubmit={handleSubscribe}>
			<div className='sub'>
				<img src={subscription.src} alt='Subscription Details' />
			</div>

			<div className='subscribe'>
				<Typography variant='h6' fontWeight={500} fontSize={20} mt={3} mb={2}>
					Payment Details
				</Typography>

				<TextField
					id='outlined-basic'
					label='Card Number'
					variant='outlined'
					fullWidth
					sx={{ mb: 2 }}
					inputMode='numeric'
					value={paymentData.cardNo || ''}
					onChange={(e) => setPaymentData({ ...paymentData, cardNo: e.target.value })}
					required
				/>
				<div className='_flex'>
					<TextField
						id='outlined-basic'
						label='Expiration date'
						placeholder='MM/YY'
						variant='outlined'
						fullWidth
						sx={{ mb: 2 }}
						inputMode='numeric'
						value={paymentData.expirationDate || ''}
						onChange={(e) => setPaymentData({ ...paymentData, expirationDate: e.target.value })}
						required
					/>
					<span style={{ padding: '6px' }}></span>
					<TextField
						id='outlined-basic'
						label='Security Code'
						variant='outlined'
						fullWidth
						sx={{ mb: 2 }}
						inputMode='numeric'
						value={paymentData.securityCode || ''}
						onChange={(e) => setPaymentData({ ...paymentData, securityCode: e.target.value })}
						required
					/>
				</div>
			</div>

			<Button variant='contained' size='large' fullWidth sx={{ my: 2.5, py: 1.5 }} type='submit'>
				{loading ? 'Loading...' : 'Confirm'}
			</Button>

			{status.type && <Alert severity={status.type}>{status.message}</Alert>}
		</form>
	);
};

export default SubscribeForm;
