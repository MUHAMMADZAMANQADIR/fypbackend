const mongoose = require('mongoose')
 
const NewsSchema = new mongoose.Schema({
    NewsType: {
        type: String,  
    },
    NewsTitle: {
        type: String, 
    },
    Description: {
        type: String,  
    },
    Location: {
        type: String,  
    },
    CarModel: {
        type: String, 
    },
    Crime: {
        type: String,
      
    },
    color: {
        type: String,
         
    },
    BrandName: {
        type: String, 
    },
    Age: {
        type: String,
      
    },
    Name: {
        type: String,
         
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports =  NewsRoom = mongoose.model('NewsRoom', NewsSchema)