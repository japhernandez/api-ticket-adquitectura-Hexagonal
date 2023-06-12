import "dotenv/config"
import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from 'helmet'
import swaggerUI from 'swagger-ui-express';


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
app.use('/api/v1/auth/', AuthRoute)
/*swagger Doxumentation */


const swaggerDocument = require('./swagger.json'); // Importing the Swagger documentation file
app.use('/api-v1-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument)) // Setting up Swagger documentation endpoint
export default app