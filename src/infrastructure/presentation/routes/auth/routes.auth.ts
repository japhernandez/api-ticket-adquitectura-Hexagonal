import { Router } from 'express';
import { AuthLogin, AuthRegister } from '../../../dependencies/auth/auth.dependencies';

const AuthRoute = Router();


AuthRoute
    .post("/register", AuthRegister.register)
    .post("/login", AuthLogin.login)


export default AuthRoute;
