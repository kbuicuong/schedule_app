import express, {Express, Request, Response} from "express";

const app: Express = express();
const port: number = 4000;

app.get("/api", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Node.js Server!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
