const express = require('express')
const router = express.Router()
const multer = require('multer')
const auth = require('../../../middleware/auth')
const path = require('path')
const { check, validationResult } = require('express-validator')

//multer file storage
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
  
//   function checkFileType(file, cb) {
//     const filetypes = /jpg|jpeg|png|mp3|mp4|mkv/
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//     const mimetype = filetypes.test(file.mimetype)
  
//     if (extname && mimetype) {
//       return cb(null, true)
//     } else {
//       cb('Images only!')
//     }
//   }
  
  const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
    },
  })


// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, path.join(__dirname, '/uploads/'))
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })

//filter the type of file
// const fileFilter = (req, file, cb) => {
//     //reject a file
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'audio/mp3' || file.mimetype === 'video/mp4') {
//         cb(null, true)
//     }
//     cb(null, false)
// }


//limit the size of file
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 100
//     },
//     fileFilter: fileFilter
// })

//crime reported model
const CrimeReported = require('../../../models/users/CrimeReported')

// @route          /api/crimeReported
// description     crime reported
//access           private

router.post('/:id',[
//     check('name', 'name is required').not().isEmpty(),
//     check('phone', 'please enter an valid phone number').isLength({ min: 11 }),
//     check('CNIC', 'please enter an valid CNIC').isLength({ min: 13 }),
//     check('city', 'please enter a city').not().isEmpty(),
//     check('policeStation', 'please enter policeStation').not().isEmpty(),
//     check('crimeType', 'please enter crime type').not().isEmpty(),
//    // check('date', 'please enter date').not().isEmpty(),
//     check('location', 'please enter location').not().isEmpty(),
//     check('description', 'please enter description').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() })
    }
    try {
        //console.log(req.files)
        const { firstName,lastName,phone,address, state,province,CNIC,email,date,gender,
             city,policeStation,investigationteam,crimeType,location ,description,ReportedDate,caseID,ReportType} = req.body
        //crime reported model 
        const newCrimeReported = new CrimeReported({
            firstName,
            lastName,
            phone,
            address,
            state,
            province,
            CNIC,
            email,
            date,
            gender,
            city,
            policeStation,
            investigationteam,
            crimeType,
            location,
            description,
            user: req.params.id,   
            ReportedDate,
            ReportType,
            caseID,
        })

        const crimeReported = await newCrimeReported.save()
        res.json(crimeReported)
    } catch (err) {
        res.status(500).send('server error')
        console.log(err.message)
    }
})

// @route          GET /api/crimeReported
// description     get all crime reported
//access           public
router.get('/', async (req, res) => {
    try {
        const crimesReported = await CrimeReported.find()
        res.json(crimesReported)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})


// @route          GET /api/crimeReported
// description     get crime reported of single user
//access           private

router.get('/', auth,  async (req, res) => {
    try {
        const crimeReported = await CrimeReported.find({ user: req.user.id })
        //check if any fir is present or not
        if (!crimeReported) {
            return res.status(404).json({msg: 'crime report not found'})
        }
        res.json(crimeReported)
    } catch (err) {
        if (err.kind === 'ObjectId'){
            return res.status(404).json({msg: 'crime report not found'})
        }
        res.status(500).send('server error')
        console.log(err.message)
    }
})



// @route          GET /api/crimeReported:id
// description     get crime reported by id
//access           private

router.get('/:id', async (req, res) => {
    try {
        const crimeReported = await CrimeReported.findById(req.params.id)
        //check if any crime reported is present or not
        if (!crimeReported) {
            return res.status(404).json({msg: '3crime report not found'})
        }
        res.json(crimeReported)
    } catch (err) {
        if (err.kind === 'ObjectId'){
            return res.status(404).json({msg: '4crime report not found'})
        }
        res.status(500).send('server error')
        console.log(err.message)
    }
})

// @route          POST /api/fir
// description     delete report
//access           public

router.delete('/:id', async (req, res) => {
    try {
        const crime = await CrimeReported.findOneAndRemove(req.params.id)
        res.json('crime deleted')
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})


module.exports = router