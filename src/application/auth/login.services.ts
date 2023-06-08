import { autoInjectable } from "tsyringe";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "@/domain/User/User";
import { UserRepository } from "@/domain/User/UserRespository";


/**
 * Servicio de autenticación y inicio de sesión.
 */
@autoInjectable()
export class LoginService {
    constructor(private userRepository: UserRepository) { }

    /**
     * Realiza el inicio de sesión de un usuario y genera un token JWT.
     * @param email - Correo electrónico del usuario.
     * @param password - Contraseña del usuario.
     * @returns {Object} - El objeto de usuario y el token JWT si la autenticación es exitosa.
     * @throws {Error} - Si el usuario no existe o la contraseña es inválida.
     */
    login = async (email: string, password: string): Promise<{ user: User, token: string }> => {
        // Buscar el usuario por su correo electrónico
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }

        // Verificar si la contraseña proporcionada coincide con la contraseña almacenada en el usuario
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Invalid password");
        }

        // Generar el token JWT
        if (!process.env.JWT_SECRET) {
            throw new Error("Failed to generate token. JWT_SECRET is missing.");
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return { user, token };
    }
}
