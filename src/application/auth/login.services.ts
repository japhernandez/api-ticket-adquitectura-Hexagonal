import { autoInjectable } from 'tsyringe';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '@/domain/User/User';
import { UserRepository } from '@/domain/User/UserRespository';
import { CustomError } from '@/domain/errors/CustomError';

/**
 * Servicio de autenticación y inicio de sesión.
 */
@autoInjectable()
export class LoginService {
  /**
   * Crea una instancia del servicio LoginService.
   * @param userRepository - Repositorio de usuarios.
   */
  constructor(private userRepository: UserRepository) {}

  /**
   * Realiza el inicio de sesión de un usuario y genera tokens de acceso y refresco.
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @returns Un objeto que contiene el usuario, el token de acceso y el token de refresco.
   * @throws {CustomError} Si el usuario no existe o la contraseña es inválida.
   */
  async login(email: string, password: string): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new CustomError(404, 'User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new CustomError(401, 'Invalid password');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { user, accessToken, refreshToken };
  }

  /**
   * Genera un token de acceso para el usuario.
   * @param user - Objeto de usuario.
   * @returns El token de acceso generado.
   * @throws {CustomError} Si no se puede generar el token debido a una configuración incorrecta.
   */
  private generateAccessToken(user: User): string {
    if (!process.env.JWT_SECRET) {
      throw new CustomError(500, 'Failed to generate token. JWT_SECRET is missing.');
    }

    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return accessToken;
  }

  /**
   * Genera un token de refresco para el usuario.
   * @param user - Objeto de usuario.
   * @returns El token de refresco generado.
   * @throws {CustomError} Si no se puede generar el token debido a una configuración incorrecta.
   */
  private generateRefreshToken(user: User): string {
    if (!process.env.JWT_SECRET) {
      throw new CustomError(500, 'Failed to generate token. JWT_SECRET is missing.');
    }

    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return refreshToken;
  }
}
