const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const notification = require('../../../models/Notifications/Notification')

/**
 * 
 * 
 *  Subject ,
    CaseID,
    CNIC,
    investigationteam,
    StartTime,
    EndTime,
    Description,
    NotificationBody,
    CallID 
 */
router.post('/sendnotification', async (req, res) => {

    const { Subject,
    CaseID,
    CNIC,
    investigationteam,
    StartTime,
    EndTime,
    Description,
    NotificationBody,
    CallID  } = req.body
     
    try {
        Notification = new notification({
            Subject,
            CaseID,
            CNIC,
            investigationteam,
            StartTime,
            EndTime,
            Description,
            NotificationBody,
            CallID
        })
        //save NOtification in the db
        NOtification=await  Notification.save();
        res.json(NOtification)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server error')
    }
})

router.get('/getnoticication', async (req, res) => {
    try {
        const Notification = await notification.find()
        console.log(Notification)
        res.json(Notification)

    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

 

module.exports = router