import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { startServer } from "./Utils";
import Product from "./Routes/Products"
import path from "path";
import fs from "fs";

const app = express();


app.use(
	cors({
		credentials: true,
		origin: ["http://localhost:5173"],
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req: Request, res: Response, next: NextFunction) => {
	res.send({
		data: {
			appName: "Starter Pack | Backend",
			developedBy: "Aditya Choudhury",
			maintainedBy: "Aditya Choudhury",
			version: "1.0.0.0",
		},
		success: true,
	});
});

app.get("/health", (req: Request, res: Response) => {
	return res.status(200).json({
		status: 200,
		message: "Server is up and running"
	})
});
app.use('/images', express.static(path.join(__dirname, 'images')));

// Custom middleware to handle non-existing files
app.use('/images', (req, res, next) => {
	const filePath = path.join(__dirname, 'images', req.url);

	// Check if the file exists
	fs.access(filePath, fs.constants.F_OK, (err) => {
		if (err) {
			// File doesn't exist
			return res.status(404).send('File does not exist');
		}

		// File exists, continue with next middleware
		next();
	});
});


app.use('/documents', express.static(path.join(__dirname, 'documents')));
app.use('/documents', (req, res, next) => {
	const filePath = path.join(__dirname, 'documents', req.url);

	// Check if the file exists
	fs.access(filePath, fs.constants.F_OK, (err) => {
		if (err) {
			// File doesn't exist
			return res.status(404).send('File does not exist');
		}

		// File exists, continue with next middleware
		next();
	});
});


app.use("/api/product", Product);

app.use((req: Request, res: Response, next: NextFunction) => {
	res.send({
		reason: "invalid-request",
		message:
			"The endpoint you wanna reach is not available! Please check the endpoint again",
		success: false,
	});
});

startServer(app);