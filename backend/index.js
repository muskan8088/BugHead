const express = require('express');
const cors = require('cors');// impacting the cors module to wnable cross-origin 
const UserRouter = require('./routers/userRouter');

// const ProductRouter = require('./routers/productRouter');
const app = express(); //creating an instance of an express appliction

const PORT = 5000;  //defining the port number for the server

// Middleware

app.use(cors({
    origin: '*', //allowing request from any origin.
}))
app.use(express.json()); //Middleware to parse JSON 

app.use('/user', UserRouter);
// app.use('/product', ProductRouter);

// app.use(express.json());
//Routing

app.get('/', (req, res) => {
    res.send('Response from the server');  //sending a response when the root URL is accessed
})

app.get('/add', (req, res) => {
    res.send('Response from the Add Route');
})

app.listen(PORT, () => {
    console.log('server is running on port -' + PORT) // logging a message when the server starts.
})
