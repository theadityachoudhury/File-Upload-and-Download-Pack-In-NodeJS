import { Request, Response, NextFunction } from "express";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers['authorization']) {
        next();
    } else {
        return res.status(400).json({ message: "Unauthorized to upload file!!!" });
    }
}

export default {verifyToken};