import { Box, Typography, styled } from "@mui/material";

const FooterContainer = styled(Box)`
    padding: 20px;
    background: #282c34;
    color: white;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const FooterSection = styled(Box)`
    flex: 1;
    margin: 10px;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <FooterSection>
                <Typography variant="h6">About Us</Typography>
                <Typography variant="body2">
                    Flipkart is India’s leading e-commerce marketplace offering over 80 million products across 80+ categories.
                </Typography>
            </FooterSection>
            <FooterSection>
                <Typography variant="h6">Customer Service</Typography>
                <Typography variant="body2">Contact Us</Typography>
                <Typography variant="body2">Return Policy</Typography>
                <Typography variant="body2">Help Center</Typography>
            </FooterSection>
            <FooterSection>
                <Typography variant="h6">Connect with Us</Typography>
                <Typography variant="body2">Facebook</Typography>
                <Typography variant="body2">Twitter</Typography>
                <Typography variant="body2">Instagram</Typography>
            </FooterSection>
            <FooterSection>
                <Typography variant="h6">Make Money with Us</Typography>
                <Typography variant="body2">Sell on Flipkart</Typography>
                <Typography variant="body2">Become an Affiliate</Typography>
                <Typography variant="body2">Advertise Your Products</Typography>
            </FooterSection>
        </FooterContainer>
    );
};

export default Footer;
