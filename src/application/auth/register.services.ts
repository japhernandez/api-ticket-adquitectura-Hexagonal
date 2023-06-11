import { autoInjectable } from 'tsyringe';
import { User } from '../../domain/User/User';
import { SequelizeUserRepository } from '../../infrastructure/database/sequelizer/repositories/SequelizerUserRespository';
import { CustomError } from '../../domain/errors/CustomError';
/**
 * Servicio de registro de usuarios.
 */
@autoInjectable()
export class RegisterService {
    constructor(private userRepository: SequelizeUserRepository) { }

    /**
     * Registra un nuevo usuario.
     * @param user Los datos del usuario a registrar.
     * @throws CustomError si ocurre un error durante el registro.
     */
    register = async (user: User): Promise<void> => {
        this.validateUser(user);

        await this.checkEmailAvailability(user.email);
        await this.checkUsernameAvailability(user.username);

        try {
            await this.userRepository.create(user);
        } catch (error) {
            throw new CustomError(500, "Error creating user");
        }
    }

    /**
     * Valida los datos del usuario a registrar.
     * @param user Los datos del usuario.
     * @throws CustomError si faltan campos requeridos.
     */
    private validateUser(user: User): void {
        const { email, password, username, name, lastName, age } = user;

        if (!email || !password || !username || !name || !lastName || !age) {
            throw new CustomError(401, "Incomplete user data");
        }
    }

    /**
     * Verifica la disponibilidad del email.
     * @param email El email a verificar.
     * @throws CustomError si el email ya está registrado.
     */
    private async checkEmailAvailability(email: string): Promise<void> {
        const existingUserWithEmail = await this.userRepository.findByEmail(email);
        if (existingUserWithEmail) {
            throw new CustomError(409, "Email already exists");
        }
    }

    /**
     * Verifica la disponibilidad del username.
     * @param username El username a verificar.
     * @throws CustomError si el username ya está registrado.
     */
    private async checkUsernameAvailability(username: string): Promise<void> {
        const existingUserWithUsername = await this.userRepository.findByUsername(username);
        if (existingUserWithUsername) {
            throw new CustomError(409, "Username already exists");
        }
    }
}
