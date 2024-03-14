import { useContext, useEffect, useState } from 'react';
import {
	Button,
	Container,
	Divider,
	InputAdornment,
	List,
	ListItem,
	TextField,
	Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ConfirmOrderModal from '../components/ConfirmOrderModal';
import { AppContext } from '../context/AppContext';
import { useRouter } from 'next/router';

const MarketPlace = () => {
	const { marketPlaceList, setHistoryList } = useContext(AppContext);
	const [confirmModal, setConfirmModal] = useState({ status: false, id: null });
	const [value, setValue] = useState(50);
	const router = useRouter();

	// Scroll to top on page load
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleConfirm = (id) => {
		setConfirmModal({ status: true, id: id });
	};

	const handleClose = () => {
		setConfirmModal({ status: false, id: null });
		setValue(50);
	};

	const handleDonate = () => {
		const data = marketPlaceList.find((item) => item.id === confirmModal.id);
		// Get delivery date
		const dateCopy = new Date();
		dateCopy.setDate(dateCopy.getDate() + ((7 - dateCopy.getDay() + 6) % 7));

		// Create new history data
		const newHistoryData = {
			...data,
			quantity: value,
			points: value / 10,
			status: 'Pending',
			date: dateCopy.toLocaleDateString(),
		};

		setHistoryList((prev) => [newHistoryData, ...prev]);
		router.push('/transactions', { state: newHistoryData });
	};

	return (
		<>
			<Container maxWidth='sm' className='container'>
				<Typography variant='h5' component='h1' align='center' mb={3} fontWeight='bold'>
					Market Place
				</Typography>

				<div className='searchForm'>
					<TextField
						fullWidth
						id='searchInput'
						size='small'
						placeholder='Search by name or quantity'
						type='search'
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
				</div>

				<List sx={{ width: '100%', mt: 2 }}>
					{marketPlaceList.map((item, index) => (
						<MarketListItem key={index} data={item} handleConfirm={handleConfirm} />
					))}
				</List>
			</Container>

			{confirmModal.status && (
				<ConfirmOrderModal
					confirmModal={confirmModal}
					handleDonate={handleDonate}
					handleClose={handleClose}
					value={value}
					setValue={setValue}
				/>
			)}
		</>
	);
};

const MarketListItem = ({ data, handleConfirm }) => {
	return (
		<>
			<ListItem className='listItem'>
				<div>
					<h5 className='_name'>{data.name}</h5>
					<span style={{ fontWeight: 500, color: '#333' }}>{data.quantity}</span>
					<span>{data.location}</span>
				</div>

				<Button variant='outlined' size='small' onClick={() => handleConfirm(data.id)}>
					Donate
				</Button>
			</ListItem>

			<Divider />
		</>
	);
};

export default MarketPlace;
