import { Router } from 'express';
import { AutRegister, AutLogin } from '../../../dependencies/auth/auth.dependencies';

const AuthRoute = Router();


AuthRoute
    .post("/register", AutRegister.register)
    .post("/login", AutLogin.login)


export default AuthRoute;
