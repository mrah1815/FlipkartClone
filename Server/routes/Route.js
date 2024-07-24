import express from 'express';
import { userSignup ,userLogin} from '../controller/User-controller.js';
import { getProducts } from '../controller/product-controller.js';
import { getProductById } from '../controller/product-controller.js';
import { addPaymentGateway, paytmResponse, phonepeintegration, statusCheck } from '../controller/payment-controller.js';

const router=express.Router();

router.post('/signup',userSignup);
router.post('/login',userLogin);

router.get('/products', getProducts);
router.get('/product/:id', getProductById);

router.post('/payment',addPaymentGateway);
router.post('/callback',paytmResponse);

router.post('/order',phonepeintegration);
router.post('/status',statusCheck);

export default router;
