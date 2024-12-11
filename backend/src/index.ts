import express, { Request, Response, NextFunction } from 'express';
import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// CORS 設定
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// JWT ミドルウェアの設定
const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }) as unknown as GetVerificationKey,
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

// 型定義拡張
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      sub: string;
      email?: string;
      roles?: string[];
    };
  }
}

// ルートは認証不要
app.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'Hello, Express!' });
});

// 保護されたルート
app.get('/protected', checkJwt, (req: Request, res: Response) => {
  res.status(200).send({ message: 'This is a protected resource.', user: req.user });
});

// 403 エラーを返す処理
app.use(((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(403).send({ error: 'Forbidden: Authentication failed' });
  }
  next(err);
}) as express.ErrorRequestHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
