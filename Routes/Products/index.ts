import express from "express";
import Auth from "../../Controller/Auth";
import fileUpload from "../../Utils/fileUpload";
import Products from "../../Controller/Products";

const router = express.Router();

// Use the verifyToken middleware first, then the uploadWithAuth middleware
router.post("/uploadWithAuth", Auth.verifyToken, fileUpload.uploadWithAuth, Products.addProduct);
router.post("/uploadWithoutAuth", fileUpload.uploadWithAuth, Products.addProduct);

router.post("/multi/uploadWithAuth", Auth.verifyToken, fileUpload.Multiupload, Products.addProduct);
router.post("/multi/uploadWithoutAuth", fileUpload.Multiupload, Products.addProduct);

router.get('/download/documents/:filename', Products.fileDownload);


export default router;
