
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import TotalView from "./TotalView";
import EmptyCart from "./EmptyCart";
import { post } from "../../utils/paytm";
import { payUsingPaytm } from "../../service/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Container=styled(Grid)(({theme})=>({
    padding: '30px 135px',
    [theme.breakpoints.down('md')]:{
        padding: '15px 0 15px 15px'
    }
}))
    

const Header=styled(Box)`
    padding: 15px 24px;
    background:#fff;
`;

const ButtonWrapper=styled(Box)`
    padding:16px 22px;
    background:#fff;
    box-shadow:0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top:1px solid #f0f0f0;
`;

const StyledButton=styled(Button)`
    display:flex;
    margin-left:auto;
    color:#fff;
    background:#fb641b;
    width:250px;
    height:51px;
    border-radius:2px;
`;

const LeftComponent=styled(Grid)(({theme})=>({
    paddingRight:15,
    [theme.breakpoints.down('md')]:{
        marginBottom: '15px'
    }
}));


const Cart=()=>{

    const{cartItems}=useSelector(state=>state.cart);

    // const buyNow= async ()=>{
    //     let response = await payUsingPaytm({amount:500, email:'aashish@gmail.com'});
    //     let information={
    //         action:'https://securegw-stage.paytm.in/order/process',
    //         params:response
    //     }
    //     post(information);
    // }

    const navigate = useNavigate()

    const data = {
        name: 'Aashish',
        amount: 1,
        number: '1234534356',
        MUID: "MUID" + Date.now(),
        transactionId: 'T' + Date.now(),
    }



    const buyNow = async (e) => {
        try {
            let res = await axios.post('http://localhost:8000/order', { ...data });
            console.log(res.data);
    
            if (res.data && res.data.data && res.data.data.instrumentResponse && res.data.data.instrumentResponse.redirectInfo) {
                window.location.href = res.data.data.instrumentResponse.redirectInfo.url;
            } else {
                console.error("Redirect URL not found in the response");
            }
        } catch (error) {
            console.error("Error during buyNow execution:", error);
        }
    }
    

    return(
       <>
        {
            cartItems.length?
            <Container container>
                <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                    <Header>
                        <Typography>My Cart ({cartItems.length})</Typography>
                    </Header>
                    {
                        cartItems.map(item=>(
                            <CartItem item={item}/>
                        ))
                    }
                    <ButtonWrapper>
                        <StyledButton onClick={()=>buyNow()}>Place Order</StyledButton>
                    </ButtonWrapper>
                </LeftComponent>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TotalView cartItems={cartItems}/>
                </Grid>
            </Container>
            :<EmptyCart/>
        }
       </>
    )
}
export default Cart;