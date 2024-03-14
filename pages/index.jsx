import React, { useEffect } from 'react';
import { Button, Card, Container, Divider, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import Link from 'next/link';
import ProfileSection from '@/components/ProfileSection';

export default function Home() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<Container maxWidth='sm' className='container'>
				<Card className='header_card' sx={{ mb: 3 }}>
					<Typography variant='h5' component='h1' className='intro_heading'>
						Recycle bottles before they get on the streets while fulfilling your green house duties
					</Typography>

					<Button
						variant='outlined'
						size='large'
						className='card_button'
						href='/marketplace'
						component={Link}
						endIcon={<ArrowForward />}>
						Donate & Buy bottles
					</Button>
				</Card>

				<Button
					variant='outlined'
					size='large'
					className='card_button'
					href='/transactions'
					component={Link}
					endIcon={<ArrowForward />}>
					<div>
						Transaction list
						<span className='button_subtext'>Checkout previous transactions</span>
					</div>
				</Button>

				<Divider variant='fullWidth' sx={{ mt: 5, mb: 3 }} />

				{/* Profile section */}
				<ProfileSection />
			</Container>
		</>
	);
}
