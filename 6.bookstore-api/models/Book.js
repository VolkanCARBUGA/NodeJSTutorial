const mongoose=require('mongoose');
const BookSchema=new mongoose.Schema({
    title:{
        type:String,
         required:[true,"Title is required"],
        trim:true,
        maxlength:[100,"Title must be less than 100 characters"],
    },
    author:{
        type:String,
        required:[true,"Author is required"],
        trim:true,
        maxlength:[100,"Author must be less than 100 characters"],
    },
    year:{
        type:Number,
        required:[true,"Year is required"],
        min:[1900,"Year must be greater than 1900"],
        max:[new Date().getFullYear(),"Year must be less than or equal to the current year"],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

// Books collection adını belirtiyoruz
const Book=mongoose.model("Book", BookSchema, "Books");

module.exports=Book;