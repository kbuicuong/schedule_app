import express, {Express, Request, Response} from "express";
import cors from "cors";
import config from '../config';
import scheduleRoute from "./Routes/scheduleRoute";
import configRoute from "./Routes/configRoute";
import { getEnvironmentVariable } from './Utils/Helper';
import path from "node:path";

const app: Express = express();

const prodOrigins = [
  getEnvironmentVariable('ORIGIN_1'),
  getEnvironmentVariable('ORIGIN_2'),
  getEnvironmentVariable('ORIGIN_3'),
];
const devOrigin = ['http://localhost:5173'];
const allowedOrigins = getEnvironmentVariable('NODE_ENV') === 'production' ? prodOrigins : devOrigin;
app.use(
  cors({
    origin: (origin, callback) => {
      if (getEnvironmentVariable('NODE_ENV') === 'production') {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`${origin} not allowed by cors`));
        }
      } else {
        callback(null, true);
      }
    },
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);
app.use(express.json());

//routes
app.use('/api', scheduleRoute);
app.use('/api', configRoute);

// app.get("/*", (req: Request, res: Response) => {
//   res.sendFile(
//     path.join(__dirname, "../../../client/dist/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.hostUrl}`);
});
