import { useContext, useEffect } from 'react';
import { Container, Divider, InputAdornment, List, ListItem, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { AppContext } from '../context/AppContext';

const History = () => {
	const { HistoryList } = useContext(AppContext);

	// Scroll to top on page load
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<Container maxWidth='sm' className='container'>
			<Typography variant='h5' component='h1' align='center' mb={3} fontWeight='bold'>
				Transaction list
			</Typography>

			<div className='searchForm'>
				<TextField
					fullWidth
					id='searchInput'
					size='small'
					placeholder='Search by name'
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
				{HistoryList.map((item, index) => (
					<HistoryListItem key={index} item={item} />
				))}
			</List>
		</Container>
	);
};

const HistoryListItem = ({ item }) => {
	return (
		<>
			<ListItem className='listItem'>
				<div>
					<h5 className='_name'>To: {item.name}</h5>
					<span style={{ fontWeight: 500, marginBottom: '2px' }}>{item.quantity} bottles donated</span>
					<span style={{ fontWeight: 400, color: '#000' }}>{item.points} S.points</span>
				</div>
				<div style={{ textAlign: 'right' }}>
					<h6 className='_date'>{item.date}</h6>
					<span
						style={{
							color:
								item.status === 'Pending' ? '#f57c00' : item.status === 'Successful' ? '#4caf50' : '#f44336',
						}}>
						{item.status}
					</span>
				</div>
			</ListItem>
			<Divider />
		</>
	);
};

export default History;
