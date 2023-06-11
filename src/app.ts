import "dotenv/config"
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from 'helmet'
import "reflect-metadata";
const app = express();
import AuthRoute from "./infrastructure/presentation/routes/auth/routes.auth";

/* settings */
app.set('port', process.env.PORT || 4000)

/*middleware */
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

/* routes */
app.set('api/v1/auth/', AuthRoute)
/*swagger Doxumentation */




export default app