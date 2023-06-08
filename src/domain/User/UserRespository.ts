import { User } from './User';

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>;
    create(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(id: string): Promise<void>;
}