import { Box, Table, TableBody, TableCell, TableRow, Typography, styled } from "@mui/material";
import {LocalOffer as Badge} from '@mui/icons-material';

const SmallText=styled(Box)`
    font-size:14px;
    vertical-align:baseline;
    & > p{
        font-size:14px;
        margin-top:5px;
    }
`

const StyledBadge=styled(Badge)`
    margin-right:10px;
    color:#00CC00;
    font-size:20px;
`

const ColumnText=styled(TableRow)`
    font-size:14px;
    vertical-align:baseline;
    & > td{
        font-size:14px;
        margin-top:10px;
        border:none;
    }
`


const ProductDetail=({product})=>{

    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';

    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';

    const date=new Date(new Date().getTime()+(5*24*60*60*1000));
    
    return(
        <>
             <Typography>{product.title.longTitle}</Typography>
                <Typography style={{marginTop:5, color:'#878787', fontSize:14}}>
                    8 Ratings & 1 Review
                    <Box component="span">
                        <img src={fassured} style={{width:77,marginLeft:20}}/>
                    </Box>
                </Typography>
                <Typography>
                    <Box component='span' style={{fontSize:28}}>₹{product.price.cost}</Box>&nbsp;&nbsp;&nbsp;
                    <Box component='span' style={{color:'#878787'}}><strike>₹{product.price.mrp}</strike></Box>&nbsp;&nbsp;&nbsp;
                    <Box component='span' style={{color:'green'}}>{product.price.discount}</Box>
                </Typography>
                <Typography>Available Offers</Typography>
                <SmallText>
                    <Typography><StyledBadge/>Bank Offer Get ₹50 instant discount on first Flipkart UPI txn on order of ₹200 and above T&C</Typography>
                    <Typography><StyledBadge/>Bank Offer 5% Cashback on Flipkart Axis Bank Card T&C</Typography>
                    <Typography><StyledBadge/>Bank Offer 6% off up to ₹2000 on HDFC Bank Credit Card EMI Txns, Tenure: 6month and above, Min Txn Value: ₹7500 T&C</Typography>
                    <Typography><StyledBadge/>Partner Offer Sign-up for Flipkart Pay Later & get free Times Prime Benefits worth ₹20,000*Know More</Typography>
                    <Typography><StyledBadge/>Partner Offer Make a purchase and enjoy a surprise cashback/ coupon that you can redeem later!Know More</Typography>
                    <Typography><StyledBadge/>Bank Offer 7% off up to ₹3500 on HDFC Bank Debit Card EMI Txns, Tenure: 6months and above, Min Txn Value: ₹7500T&C</Typography>
                </SmallText>
                <Table>
                    <TableBody>
                        <ColumnText>
                            <TableCell style={{color:'#878787'}}>Delivery </TableCell>
                            <TableCell style={{fontWeight:600}}>Delivery By {date.toDateString()} | ₹40</TableCell>
                        </ColumnText>
                        <ColumnText>
                            <TableCell style={{color:'#878787'}}>Warranty </TableCell>
                            <TableCell >No Warranty</TableCell>
                        </ColumnText>
                        <ColumnText>
                            <TableCell style={{color:'#878787'}}>Seller </TableCell>
                            <TableCell >
                                <Box component="span" style={{color:'#2874f0'}}>SuperComNet</Box>
                                <Typography>GST Invoice Available</Typography>
                                <Typography>View more sellers starting from ₹{product.price.cost}</Typography>
                            </TableCell>
                        </ColumnText>
                        <ColumnText>
                            <TableCell colSpan={2}>
                                <img src={adURL} style={{width:390}} alt="flipkartpoints"/>
                            </TableCell>
                        </ColumnText>
                        <ColumnText>
                            <TableCell style={{color:'#878787'}}>Description </TableCell>
                            <TableCell >{product.description}</TableCell>
                        </ColumnText>
                    </TableBody>
                </Table>
        </>
    )
}

export default ProductDetail;