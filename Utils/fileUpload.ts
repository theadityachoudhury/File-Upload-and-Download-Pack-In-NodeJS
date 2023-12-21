import multer from "multer";
import fs from 'fs';
import generateUniqueId from "./uniqueIdGenerator";


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = ['images', 'documents'];
        let active = (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') ? 0 : 1;
        // Create the "images" directory if it doesn't exist
        fs.mkdir(destinationPath[active], { recursive: true }, (err) => {
            if (err) {
                return cb(err, '');
            }
            cb(null, destinationPath[active]);
        });
    },
    filename: (req, file, cb: any) => {
        cb(null, generateUniqueId() + '-' + file.originalname);
    },
});




const fileFilter: any = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'application/pdf'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const uploadWithAuth = multer({ storage: fileStorage, fileFilter: fileFilter }).single('image');

const uploadWithoutAuth = multer({ storage: fileStorage, fileFilter: fileFilter }).single('image');

const Multiupload = multer({ storage: fileStorage, fileFilter: fileFilter }).array('images', 5);


export default { fileFilter, fileStorage, uploadWithAuth, uploadWithoutAuth, Multiupload }