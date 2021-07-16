// const imagemin = require('image-min');

const multer = require('multer');
const moment = require('moment');




const storage = multer.diskStorage({
    destination(req, file, cb){
        console.log(file)
        cb(null, 'storage/posts/')
    },
    filename(req, file, cb){
        const date = moment().format('DDMMYYYY-HHmmss_SSS')
        cb(null, file.originalname)
    }
})


const limits = {
    fileSize: 1024 * 1024 * 5
}


module.exports = multer({
    storage,
    // fileFilter,
    limits
})







