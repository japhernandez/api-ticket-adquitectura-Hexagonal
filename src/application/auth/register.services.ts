import { autoInjectable } from "tsyringe";
import { User } from "@/domain/User/User";
import { UserRepository } from "@/domain/User/UserRespository";

@autoInjectable()
export class RegisterService {
    constructor(private userRepository: UserRepository) { }

    /**
     * Registra un nuevo usuario.
     * @param user Los datos del usuario a registrar.
     * @throws Error si ocurre un error durante el registro.
     */
    register = async (user: User): Promise<void> => {
        // Validación de los datos del usuario
        if (!user.email || !user.password || !user.username || !user.name || !user.lastName || user.age) {
            throw new Error("Incomplete user data");
        }

        try {
            await this.userRepository.create(user);
        } catch (error) {
            // Manejo de errores específicos del repositorio
            throw new Error("Error creating user");
        }
    }
}
