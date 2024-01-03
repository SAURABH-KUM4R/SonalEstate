import jwt from "jsonwebtoken";
import { AppError } from "./error.js";

export const verifyUser = (req,res,next) => {
    const token = req.cookies.access_token;
    
    if (!token) return next(res.json(AppError(401, 'Unauthorized')));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(AppError(403,'Forbidden'));
        }
        req.user = user;
        next();
    })
}