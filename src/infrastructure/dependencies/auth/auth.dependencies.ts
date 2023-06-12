import * as  awilix from "awilix";
import { LoginService } from "../../../application/auth/login.services";
import { RegisterService } from "../../../application/auth/register.services";
import { RegisterController } from "../../presentation/controllers/auth/register.controller";
import { LoginController } from "../../presentation/controllers/auth/login.controller";
import { SequelizeUserRepository } from "../../database/sequelizer/repositories/SequelizerUserRespository";
const container = awilix.createContainer();

container.register({
    LoginService: awilix.asClass(LoginService),
    LoginController: awilix.asClass(LoginController),
    RegisterService: awilix.asClass(RegisterService),
    RegisterController: awilix.asClass(RegisterController),
    userRepository: awilix.asClass(SequelizeUserRepository).singleton()
})

export const AutLogin = container.resolve("LoginController")
export const AutRegister = container.resolve("RegisterController")