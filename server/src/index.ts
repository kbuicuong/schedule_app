import express, {Express, Request, Response} from "express";
import cors from "cors";
import config from '../config';
import scheduleRoute from "./Routes/scheduleRoute";
import configRoute from "./Routes/configRoute";
import path from "node:path";

const app: Express = express();
app.use(cors());
app.use(express.json());

//routes
app.use('/api', scheduleRoute);
app.use('/api', configRoute);

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../../client/dist/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
  // res.sendFile(__dirname + '../../client/dist/index.html');
  // console.log(__dirname + '../../client/dist/index.html');
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.hostUrl}`);
});
