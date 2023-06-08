import "dotenv/config"
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from 'helmet'
import "reflect-metadata";
const app = express();

/* settings */
app.set('port', process.env.PORT || 4000)

/*middleware */
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

/* routes */

/*swagger Doxumentation */




export default app