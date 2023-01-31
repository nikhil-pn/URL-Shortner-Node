const express = require("express")
const createDb = require("../config/db")
const Url = require("../models/userModels");

const router= express.Router()
// const {nanoid} = require('nanoid')  ;

const baseUrl = "https://url-shortner-sh3s.onrender.com"

createDb.sync().then(()=>{
  console.log("Db is Running")
})

router.post("/", async(req, res)=>{
  try{
    const {longUrl} = req.body;
    console.log(longUrl)
    console.log("hello")
    
    //conver long url into a id
    const shortID = Math.floor(Math.random() * 9999);
    console.log(shortID, "shortID")
    //store in db
    const shortUrl = await Url.create({
      longUrl,
      shortUrl : shortID
    });
  return res.status(200).json({
    status: "ok",
    shortUrl : `${baseUrl}/${shortID}`
  })
    
  }catch(e){
    console.error(e)
    return res.status(500).send(e)
  }
})

router.get("/:short", async (req, res)=>{
  let shortIdParam  = req.params.short
  try{
    let url = await Url.findOne({
      where: {
        shortUrl : shortIdParam
      }
    })
    if(!url){
      return res.status(404).send("Invaild Short URl")
    }
    console.log("urrrrrrrrrrrrrrrrrrrrr")
    console.log(url, "url return")
    return res.redirect(url.longUrl)
  }catch(e){
    return res.status(500).send(e)
  }
})

module.exports = router;