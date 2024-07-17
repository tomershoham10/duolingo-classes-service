import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const authenticateAndAuthorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenHeader = req.header('Authorization') as string;
    const token = tokenHeader.split(' ')[1];

    const response = await axios.post(
      'http://authentication-service:4000/validate-token',
      {
        token,
      }
    );

    if (response.data && response.data.valid) {
      next();
    } else {
      res.status(403).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default authenticateAndAuthorize;
