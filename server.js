const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")
const mongoose = require("mongoose")

mongoose.set('strictQuery', false);

const IndexRoute = require("./Routers/index")
const connectDatabase = require("./Helpers/database/connectDatabase")
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler")

dotenv.config({
    path:  './.env'
});


connectDatabase();


const app = express() ;

app.use(express.json())
app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}))

app.use("/",IndexRoute)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(customErrorHandler)

const PORT = process.env.PORT || 5000 ;

app.use(express.static(path.join(__dirname , "public") ))

const server = app.listen(PORT,()=>{

    console.log(`Server running on port  ${PORT} : ${process.env.NODE_ENV}`)

});

process.on("unhandledRejection",(err , promise) =>{
    console.log(`Logged Error : ${err}`)

    server.close(()=>process.exit(1))
});
