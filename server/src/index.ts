import express, {Express, Request, Response} from "express";
import cors from "cors";
import config from '../config';
import scheduleRoute from "./Routes/scheduleRoute";

const app: Express = express();
app.use(cors());
app.use(express.json());

//routes
app.use('/api', scheduleRoute);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.hostUrl}`);
});
