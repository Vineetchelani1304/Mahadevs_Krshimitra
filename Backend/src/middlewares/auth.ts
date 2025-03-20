import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    body: { farmerId?: string };
}

export const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from 'Bearer <token>' format

    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        req.body.farmerId = decoded.userId;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
        return;
    }
};
