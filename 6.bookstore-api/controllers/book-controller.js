const Book=require('../models/Book');
const getAllBooks=async(req,res)=>{
    try {
        const allBooks=await Book.find();
        res.status(200).json({
            success:true,
            message:"All books fetched successfully",
            books:allBooks});
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message});
    }
}
const getBookById=async(req,res)=>{
    try {
        const bookId=req.params.id;
        const book=await Book.findById(bookId);
        if(!book){
            return res.status(404).json({
                success:false,
                message:"Book not found"});
        }
        res.status(200).json({
            success:true,
            message:"Book fetched successfully",
            book:book});
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message});
    }
}
const addNewBook=async(req,res)=>{
    try {
        const newBookFormData=req.body;
        const newBook=await Book.create(newBookFormData);
        if(!newBook){
            return res.status(400).json({
                success:false,
                message:"Invalid book data"});
        }
        res.status(201).json({
            success:true,
            message:"Book created successfully",
            book:newBookFormData});
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message});
    }
}
const updateBook=async(req,res)=>{
    try {
        const bookId=req.params.id;
        const updatedBookFormData=req.body;
        const updatedBook=await Book.findByIdAndUpdate(bookId,updatedBookFormData,{new:true});
        if(!updatedBook){
            return res.status(404).json({
                success:false,
                message:"Book not found"});
        }
        res.status(200).json({
            success:true,
            message:"Book updated successfully",
            book:updatedBook});
       
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message});
    }
}
const deleteBook=async(req,res)=>{
    try {
        const bookId=req.params.id;
        const deletedBook=await Book.findByIdAndDelete(bookId);
        if(!deletedBook){
            return res.status(404).json({
                success:false,
                message:"Book not found"});
        }
        res.status(200).json({
            success:true,
            message:"Book deleted successfully",
            book:deletedBook});
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message});
    }
}

module.exports={
    getAllBooks,
    getBookById,
    addNewBook,
    updateBook,
    deleteBook,
}