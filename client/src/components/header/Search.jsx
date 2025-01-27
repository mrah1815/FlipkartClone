import { useState,useEffect } from 'react';
import {Box,InputBase, List, ListItem, styled} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from "react-redux";
import { getProducts} from "../../Redux/actions/productActions";
import { Link } from 'react-router-dom';

const SearchContainer=styled(Box)`
    background:#fff;
    width:38%;
    border-radius:2px;
    margin-left:10px;
    display:flex;
`
const InputSearchBase=styled(InputBase)`
    padding-left:20px;
    width:100%;
    font-size:unset;
`
const SearchIconWrapper=styled(Box)`
    color:blue;
    padding:5px;
    display:flex;
`

const ListWrapper=styled(List)`
    position:absolute;
    background:#FFFFFF;
    color:#000;
    margin-top:30px;
`

const Search=()=>{

    const {products}=useSelector(state=>state.getProducts);

    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch]);

    const[text,setText]=useState('');

    const getText=(text)=>{
        setText(text);
    }

    return (
       <SearchContainer>
            <InputSearchBase
                placeholder='Search for Products, Brands and More'
                onChange={(e)=>getText(e.target.value)}
                value={text}
            />
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            {
                text && 
                <ListWrapper>
                    {
                        products.filter(product=>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                            <ListItem>
                                <Link to={`/product/${product.id}`} onClick={()=>setText('')} style={{textDecoration:'none', color:'inherit'}}>
                                    {product.title.longTitle }
                                </Link>
                            </ListItem>
                        ))
                    }
                </ListWrapper>
            }
       </SearchContainer>
    )
}

export default Search;