require('dotenv').config()
require('express-async-errors')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error')
const productRouter = require('./routes/products')


const express = require('express');
const app = express()

app.use(express.json())


app.use('/api/v1/products', productRouter)

app.get('/', (req,res)=>{
    res.send('<h1>My STore Api</h1><a href="/api/v1/products"> Products</a>')
})


app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 3000


const start = async ()=>{
   try {
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT,
    console.log(`server is running on PORT:${PORT}`))
    console.log("connected sucessfully")
   
    
   } catch (error) {
    console.log(error)
    
   }

}

start()