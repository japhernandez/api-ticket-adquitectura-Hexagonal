import { container } from 'tsyringe'
import { LoginController } from '../../presentation/controllers/auth/login.controller'
import { RegisterController } from '../../presentation/controllers/auth/register.controller'


export const AuthLogin = container.resolve(LoginController)
export const AuthRegister = container.resolve(RegisterController)
