const express=require('express');
const {getAllBooks,getBookById,addNewBook,updateBook,deleteBook}=require('../controllers/book-controller');

//create express router
const router=express.Router();

//all routes that are related to books only
router.get('/',getAllBooks);
router.get('/:id',getBookById);
router.post('/add',addNewBook);
router.put('/:id',updateBook);
router.delete('/:id',deleteBook);


module.exports=router;