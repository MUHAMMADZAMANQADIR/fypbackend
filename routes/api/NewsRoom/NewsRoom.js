const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const NewsRoom = require('../../../models/News/News')


router.post('/postanews', async (req, res) => {

    const { Description, CarModel ,Crime ,color ,
        BrandName, Age,Name, NewsType, NewsTitle, Location } = req.body
     
    try {
        newsRoom = new NewsRoom({
           Description, CarModel ,Crime ,color ,
        BrandName, Age,Name, NewsType, NewsTitle ,Location
        })
        //save news in the db
        news=await newsRoom.save();
        res.json(news)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

router.get('/', async (req, res) => {
    try {
        const newsRoom = await NewsRoom.find()
        res.json(newsRoom)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

module.exports = router