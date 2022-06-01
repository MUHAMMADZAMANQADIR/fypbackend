const express = require('express')
const app = express()
const connectDB = require('./config/db')
const bodyParser = require("body-parser")
var cors = require('cors')

app.get('/', (req, res) => res.send('server is running at port 500'))
app.use(express.json());
app.use(cors())


//connect database
connectDB();

//Init middleware
app.use(express.json({extended: false}))
app.use(bodyParser.urlencoded({ extended: true }));

//Define users routes
app.use('/api/users', require('./routes/api/users/users'))
app.use('/api/auth', require('./routes/api/users/auth'))
app.use('/api/crimeReported', require('./routes/api/users/crimeReported'))
app.use('/api/fir', require('./routes/api/users/fir'))
app.use('/api/mukhbir', require('./routes/api/users/mukhbir'))

//Define admin routes
app.use('/api/admin', require('./routes/api/adminPanel/policeStation'))

//Define police station routes
app.use('/api/policeStation', require('./routes/api/policeStation/policeStations'))
//Define investigation routes
app.use('/api/investigationteams', require('./routes/api/policeStation/investigationTeam'))
//Define get asinged everything routes
app.use('/api/getcases', require('./routes/api/getcases/Getcases'))
//Define update cases routes
app.use('/api/updatedReported', require('./routes/api/UpdatedReport/updatedReportRoutes'))
//Define NewsRoom routes
app.use('/api/news', require('./routes/api/NewsRoom/NewsRoom'))
//Define Notification  routes
app.use('/api/notification', require('./routes/api/Notification/notification'))
//Define update cases routes
app.use('/api/updatedReported', require('./routes/api/UpdatedReport/UpdatesInonetable'))
//Define admin routes
app.use('/api/alladmin', require('./routes/api/adminPanel/admin'))
const PORT = process.env.PORT || 5000

app.listen(PORT , console.log(`server started on port ${PORT}`))