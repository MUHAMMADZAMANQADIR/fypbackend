const express = require('express')
const router = express.Router()
const multer = require('multer')
const auth = require('../../../middleware/auth')
const path = require('path')
const { check, validationResult } = require('express-validator')

// //multer file storage
const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      )
    },
})
  
const upload = multer({storage:storage})
  
  // function checkFileType(file, cb) {
  //   const filetypes = /jpg|jpeg|png|mp3|mp4|mkv/
  //   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  //   const mimetype = filetypes.test(file.mimetype)
  
  //   if (extname && mimetype) {
  //     return cb(null, true)
  //   } else {
  //     cb('Images only!')
  //   }
  // }
  
  


// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, path.join(__dirname, '/uploads/'))
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb)
//   },
// })

// // filter the type of file
// const fileFilter = (req, file, cb) => {
//     //reject a file
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'audio/mp3' || file.mimetype === 'video/mp4') {
//         cb(null, true)
//     }
//     cb(null, false)
// }


// limit the size of file
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 100
//     },
//     fileFilter: fileFilter
// })


//crime reported model
const Mukhbir = require('../../../models/users/Mukhbir')

// @route          /api/crimeReported
// description     crime reported
//access           private

router.post('/:id',[
  check('description', 'description is required').not().isEmpty(),
  check('city', 'please enter a city').not().isEmpty(),
  check('date', 'date is required').not().isEmpty(),
  check('location', 'please enter location').not().isEmpty(),
  check('policeStation', 'please enter police station name').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { description,city,date, location, policeStation} = req.body
        //mukhbir model 
        const newMukhbir = new Mukhbir({
            description,
            city,
            date,
            location,
            policeStation,
            user: req.params.id
        })

        const mukhbir = await newMukhbir.save()
        res.json('your response is submitted')
    } catch (err) {
        res.status(500).send('server error')
        console.log(err.message)
    }
})


module.exports = router