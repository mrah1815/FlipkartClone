
import Header from './components/header/Header';
import Home from './components/home/Home';
import {Box} from '@mui/material';
import DataProvider from './context/DataProvider';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import DetailView from './components/detail/DetailView';
import Cart from './components/cart/Cart';
import SellerPage from './components/header/SellerPage';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Header/>
        <Box style={{marginTop:54}}>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/product/:id' element={<DetailView/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path="/seller" element={<SellerPage/>} />
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
