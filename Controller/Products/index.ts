import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";


const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    const image = req.file || req.files;
    const { name, email } = req.body;

    if (image) {
        return res.status(200).json({ message: "Upload Successful" });
    }
    return res.status(400).json({ message: "Upload Not Successful" });
}


const fileDownload = (req: Request, res: Response, next: NextFunction) => {
    const { filename } = req.params;
    const filePath = path.join('documents', filename + '.pdf');
    // fs.readFile(filePath, (err, data) => {
    //     if (err) {
    //         return res.status(404).json("File not found");
    //     }
    //     res.setHeader('Content-Type', 'application/pdf');
    //     res.setHeader('Content-Disposition', 'inline; filename="document.pdf"');
    //     res.send(data);
    // })
    const file = fs.createReadStream(filePath);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="document.pdf"');
    file.pipe(res);
}

export default { addProduct, fileDownload };