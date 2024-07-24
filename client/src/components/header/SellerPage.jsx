import React from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #2874f0;
    color: white;
`;

const NavItem = styled(Typography)`
    margin: 0 10px;
    cursor: pointer;
    text-transform: uppercase;
`;

const SellerPage = () => {
    return (
        <div>
            <Navbar>
                <Box>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button variant="contained" style={{ backgroundColor: '#ffffff', color: '#2874f0' }}>
                            Start Selling
                        </Button>
                    </Link>
                </Box>
                <Box display="flex">
                    <NavItem>Sell Online</NavItem>
                    <NavItem>Fees and Commission</NavItem>
                    <NavItem>Grow</NavItem>
                    <NavItem>Learn</NavItem>
                    <NavItem>Shopsy</NavItem>
                    <NavItem>Login for Seller</NavItem>
                </Box>
            </Navbar>
            <Box p={3}>
                <Typography variant="h4">Welcome to the Seller Page</Typography>
                {/* Add more content here as needed */}
            </Box>
        </div>
    );
};

export default SellerPage;
