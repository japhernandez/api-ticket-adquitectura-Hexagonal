import { Router } from 'express';
import { AuthLogin, AuthRegister } from '../../../dependencies/auth/auth.dependencies';

const AuthRoute = Router();


AuthRoute
    .post("/auth/register", AuthRegister.register)
    .post("/auth/login", AuthLogin.login)


export default AuthRoute;
