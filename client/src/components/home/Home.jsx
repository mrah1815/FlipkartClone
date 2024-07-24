import { Box ,styled} from "@mui/material";
import Banner from "./Banner";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { getProducts } from "../../Redux/actions/productActions";
import { useDispatch,useSelector } from "react-redux";
import Slide from "./Slide";
import MidSlide from "./MidSlide";
import MidSection from "./MidSection";
import Footer from "./Footer";

const Component=styled(Box)`
    padding: 10px;
    background: #F2F2F2;
`


const Home=()=>{

    const dispatch =useDispatch();

    const { products }=useSelector(state=>state.getProducts);
    console.log(products);

    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])

    return(
        <>   
            <NavBar/>
            <Component>
                <Banner/>    
                <MidSlide products={products} title="Deal of the Day" timer={true}/>
                <MidSection/>
                <Slide products={products} title="Discounts for You" timer={false}/>
                <Slide products={products} title="Suggesting Items" timer={false}/>
                <Slide products={products} title="Top Selections" timer={false}/>
                {/* <Slide products={products} title="Recommended Items" timer={false}/>
                <Slide products={products} title="Trending Offers" timer={false}/>
                <Slide products={products} title="Season's top Picks" timer={false}/>
                <Slide products={products} title="Top Deals on Accessories" timer={false}/> */}
            </Component> 
            <Footer/>
        </>
    )
}
export default Home;