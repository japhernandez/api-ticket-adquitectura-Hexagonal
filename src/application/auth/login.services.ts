import { autoInjectable } from "tsyringe";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "@/domain/User/User";
import { UserRepository } from "@/domain/User/UserRespository";
import { CustomError } from "@/domain/errors/CustomError";

@autoInjectable()
export class LoginService {
    constructor(private userRepository: UserRepository) { }

    async login(email: string, password: string): Promise<{ user: User, token: string }> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new CustomError(404, "User not found");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new CustomError(401, "Invalid password");
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new CustomError(500, "Failed to generate token. JWT_SECRET is missing.");
        }

        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

        return { user, token };
    }
}
