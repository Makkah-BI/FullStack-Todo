import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

{
  /**export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    console.log(decoded);

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};*/
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("HEADER:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);
    console.log("SECRET:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    (req as any).user = {
      id: decoded.userId,
    };

    next();
  } catch (error) {
    console.log("JWT ERROR:", error);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
