import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import { fileURLToPath } from 'url';

import * as route from './routes.js';
import * as userRoute from './routes_auth.js';
import { authenticateToken } from './jwt/authentication.js';

// const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const corsOptions = {credentials:true, origin: process.env.URL || '*'};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/contacts', route.default);
app.use("/user", route.user);
app.use('/auth', userRoute.default);

app.get("/", (req, res) => {
    res.send("hello world");
});




app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`app listening on port ${port}`))
