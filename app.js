require('dotenv').config()
const express =require ('express');
const app = express();
const port = 5500;
const cors = require('cors')
//cros origin resource sharing
app.use(cors())

//Route middlware file
const userRoutes = require('./routes/userRoute')
const questionRoutes = require('./routes/questionRoute')


//Route middlware of questions
app.use('/api/questions', questionRoutes)

//json middleware 
app.use(express.json())

//Route middlware of users
app.use('/api/users', userRoutes)

app.listen(port, (err)=>{
    if(err){
        console.log(err.message)
    }else{
        console.log(`listening on ${port}`)
    }
})