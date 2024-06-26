// // var upload = require('../../../utils/upload.utils')
// const sharp = require('sharp');
// var sizeOf = require('buffer-image-size');

// const { promisify } = require('util');
// const fs = require('fs');
// const convert = require('heic-convert');

// module.exports = async (req, res, next) => {
//         var arrayResponse = [];
//         for (const element of req.files) {
//             console.log("----------------------------------------------------------------")
//             console.log(element)
//             var buffer = element.buffer;
            
//             console.log("🚀 ~ module.exports= ~ element.mimetype:", element.mimetype)
//             if(element.mimetype.split("/")[1] === "heic"){
//                 console.log("heic")
//                 buffer = await convert({
//                   buffer: buffer, // the HEIC file buffer
//                   format: 'JPEG',      // output format
//                   quality: 1           // the jpeg compression quality, between 0 and 1
//                 });
//             }


//             // console.log("🚀 ~ module.exports= ~ imageSize:", "imageSizeimageSize")
//             // var imageSize = sizeOf(buffer);
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + Math.round(Math.random() * 1E9) + ".png"   
//             console.log("🚀 ~ module.exports= ~ uniqueSuffix:", uniqueSuffix)
//             await sharp(buffer)
//                 // .flatten( { background: '#fff' } )
//                 // .composite([
//                 //     { input: './public/logo.svg',  top: (300-60), left: (10) , blend: "atop"}
//                 // ])
//                 .sharpen()
//                 .withMetadata()
//                 .webp( { quality: 80 } )
//                 // .resize(630,300)
//                 .toFile(`./public/images/${uniqueSuffix}`).then((output) => {
//                     arrayResponse.push(uniqueSuffix);
//                 });
//           }
    
//     res.status(200).json({data:arrayResponse})
// }

const sharp = require('sharp');
const convert = require('heic-convert');

module.exports = async (req, res, next) => {
    try {
        const arrayResponse = [];
        for (const element of req.files) {
            console.log("----------------------------------------------------------------");
            console.log(element);

            let buffer = element.buffer;
            if (element.mimetype.split("/")[1] === "heic") {
                console.log("heic");
                buffer = await convert({
                    buffer: buffer,
                    format: 'JPEG',
                    quality: 1
                });
            }

            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + Math.round(Math.random() * 1E9) + ".png";
            console.log("🚀 ~ module.exports= ~ uniqueSuffix:", uniqueSuffix);

            await sharp(buffer)
                .sharpen()
                .withMetadata()
                .webp({ quality: 80 })
                .toFile(`./public/images/${uniqueSuffix}`);

            arrayResponse.push(uniqueSuffix);
        };
    
        res.status(200).json({ data: arrayResponse });
    } catch (error) {
        console.error("Error processing files:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
