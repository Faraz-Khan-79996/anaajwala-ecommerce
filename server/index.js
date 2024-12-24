
const express = require('express')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const AuthRouter = require('./routes/auth.route.js')
const UserRouter = require('./routes/user.route.js')
const OrderRouter = require('./routes/order.route.js')
const ProductRouter = require('./routes/product.route.js')
const SiteRouter = require('./routes/site.route.js')
const SurveyRouter = require('./routes/survey.route.js')
const OfferRouter = require('./routes/offer.route.js')
const path = require('path')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3000;



async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/anaaj-wala');
  await mongoose.connect(process.env.MONGO_STRING , { useNewUrlParser: true, useUnifiedTopology: true});
  console.log("database connected");
  
}
main().catch(err => console.log(err));

const cors = require('cors');

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth' , AuthRouter);
app.use('/api/user' , UserRouter);
app.use('/api/order' , OrderRouter);
app.use('/api/product' , ProductRouter);
app.use('/api/site' , SiteRouter);
app.use('/api/survey' , SurveyRouter)
app.use('/api/offer' , OfferRouter)

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"))
})


app.use((err , req , res , next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "kuch to gadbad he daya";
  const type = err.message || "";

  return res.status(statusCode).json({
      success : false,
      statusCode,
      message,
      type
  })
})


app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})