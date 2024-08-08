import './Home.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Home() {
    return <div className="App">
        <Typography color="#405D72" variant="h4" gutterBottom> Welcome to STOCK4U! </Typography>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
            <div className="Card">
                <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Follow your profits!
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        </Box>
                    </Box>
                </Card>
            </div>
            <div className="Card">
                <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Invest without Charge!
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        </Box>
                    </Box>
                </Card>
            </div>

            <div className="Card">
                <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Learn With ease!
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        </Box>
                    </Box>
                </Card>
            </div>

        </div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
            <div className="Card">
                <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Compete against your friends!
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        </Box>
                    </Box>
                </Card>
            </div>
            <div className="Card">
                <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Earn achievements
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        </Box>
                    </Box>
                </Card>
            </div>

            <div className="Card">
                <Card sx={{ display: 'flex', backgroundColor: '#F7E7DC', color: '#405D72', minWidth: '250px', justifyContent: 'center', borderRadius: '8px', minHeight: '120px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5">
                                Gain knowledge!
                            </Typography>
                        </CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        </Box>
                    </Box>
                </Card>
            </div>

        </div>  

        <Typography component="div" variant="h1">
            Join over 1m customers
        </Typography>      
        <Typography component="div" variant="h1">
            All over the world!
        </Typography>
    </div>;

}

export default Home;