import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../domain/User/User';
import { SequelizeUserRepository } from '../../infrastructure/database/sequelizer/repositories/SequelizerUserRespository';
import { CustomError } from '../../domain/errors/CustomError';

/**
 * Clase que representa el servicio de inicio de sesión.
 */

export class LoginService {
  /**
   * Constructor de la clase LoginService.
   * @param userRepository Repositorio de usuarios.
   */
  constructor(private readonly userRepository: SequelizeUserRepository) { }

  /**
   * Método asincrónico para realizar el inicio de sesión.
   * @param email Dirección de correo electrónico del usuario.
   * @param password Contraseña del usuario.
   * @returns Una promesa que se resuelve en un objeto con las propiedades 'user' y 'token'.
   * @throws CustomError si se produce algún error durante el proceso de inicio de sesión.
   */
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    // Buscar el usuario por su dirección de correo electrónico
    const user = await this.userRepository.findByEmail(email);

    // Si no se encuentra ningún usuario, lanzar un error personalizado
    if (!user) {
      throw new CustomError(404, 'Invalid email');
    }

    // Comparar la contraseña proporcionada con la contraseña almacenada del usuario
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Si las contraseñas no coinciden, lanzar un error personalizado
    if (!passwordMatch) {
      throw new CustomError(401, 'Invalid password');
    }

    // Verificar la existencia de la variable de entorno JWT_SECRET
    const jwtSecret = process.env.JWT_SECRET;

    // Si JWT_SECRET no está definido, lanzar un error personalizado
    if (!jwtSecret) {
      throw new CustomError(500, 'Failed to generate token. JWT_SECRET is missing.');
    }

    // Generar un token JWT firmado que contiene el ID de usuario
    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

    // Devolver el usuario y el token como resultado del inicio de sesión
    return { user, token };
  }
}

