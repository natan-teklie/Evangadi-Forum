require('dotenv').config()
const express =require ('express');
const app = express();
const port = 5500;


//Route middlware file
const userRoutes = require('./routes/userRoute')
const questionRoutes = require('./routes/questionRoute')

//json middleware 

app.use('/api/questions', questionRoutes)

app.use(express.json())

//Route middlware
app.use('/api/users', userRoutes)




app.listen(port, (err)=>{
    if(err){
        console.log(err.message)
    }else{
        console.log(`listening on ${port}`)
    }
})