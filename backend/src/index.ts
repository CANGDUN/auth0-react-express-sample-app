import express, { Request, Response } from 'express';

const app = express();
const PORT = 4000;

// JSON データの受け取りを有効化
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript + Express!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
