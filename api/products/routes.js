
const express = require('express');
const router = express.Router();
const { auth } = require('../../utils/middleware/auth_middleware');
const { registerProduct, getAllProducts, updateProduct, deleteProduct, getProduct} = require('./controller/productController');

router.post('/register',auth, registerProduct)
router.get('/getAll', auth, getAllProducts)
router.get('/:id', getProduct)
router.patch('/:id', updateProduct)
router.delete('/:id',auth, deleteProduct)


module.exports = router;