const express = require("express");
const app  = express();
const homeRoute = require("./routes/home")
const shortUrl  = require("./routes/url")

//middle wares function that are callled before calling the api call
app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended : false}))

app.use("/urlapi", shortUrl)
app.use("/", homeRoute )

const PORT = 3001;
app.listen(PORT, ()=>{
  console.log("App is running on the Port = ", PORT)
})