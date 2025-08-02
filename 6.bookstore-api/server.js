const express = require('express');
require('dotenv').config();
const connectDB=require('./database/db');
const bookRoutes=require('./routes/book-routes');

const app=express();
const PORT=process.env.PORT || 3000;

//connect to database
connectDB();
//middleware
app.use(express.json());
//routes
app.use('/api/books',bookRoutes);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});