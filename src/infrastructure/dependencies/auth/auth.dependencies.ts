import { container, autoInjectable } from 'tsyringe';
import { LoginController } from '../../presentation/controllers/auth/login.controller';
import { RegisterController } from '../../presentation/controllers/auth/register.controller';


// Registra los servicios y los controladores en el contenedor


// Resuelve los controladores
export const AuthLogin = container.resolve(LoginController);
export const AuthRegister = container.resolve(RegisterController);
