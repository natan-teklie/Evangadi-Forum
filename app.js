const express = require('express');
const app = express();
const port =5500;


//userRoute middleware file
const userRoutes = require('./routes/userRoute')

//json middleware
app.use(express.json())


//userRoute middleware
app.use('/api/users', userRoutes)




app.listen(port, (err) =>{
    if(err){
        console.log(err.message)
    }else{
        console.log(`listening on ${port}`)
    }
})