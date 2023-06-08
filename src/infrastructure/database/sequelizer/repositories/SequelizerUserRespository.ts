import { User } from "@/domain/User/User";
import { UserModel } from "../models/User.model";
import { UserRepository } from "@/domain/User/UserRespository";


/**
 * Implementación del repositorio SequelizeUserRepository que utiliza Sequelize para interactuar con la base de datos.
 * Implementa la interfaz UserRepository.
 */
export class SequelizeUserRepository implements UserRepository {
    /**
     * Busca un usuario por su dirección de correo electrónico.
     * @param email - La dirección de correo electrónico del usuario a buscar.
     * @returns Una promesa que se resuelve con el objeto User correspondiente o null si no se encuentra.
     */
    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ where: { email } });
        return user ? this.mapUserModelToUser(user) : null;
    }

    /**
     * Crea un nuevo usuario en la base de datos.
     * @param user - El objeto User que contiene los datos del usuario a crear.
     * @returns Una promesa que se resuelve cuando se ha creado el usuario.
     */
    async create(user: User): Promise<void> {
        const userModelData = { ...user };
        await UserModel.create(userModelData);
    }

    /**
     * Actualiza los datos de un usuario existente en la base de datos.
     * @param user - El objeto User con los datos actualizados del usuario.
     * @returns Una promesa que se resuelve cuando se han actualizado los datos del usuario.
     */
    async update(user: User): Promise<void> {
        await UserModel.update(user, { where: { id: user.id } });
    }

    /**
     * Elimina un usuario de la base de datos.
     * @param id - El ID del usuario a eliminar.
     * @returns Una promesa que se resuelve cuando se ha eliminado el usuario.
     */
    async delete(id: string): Promise<void> {
        await UserModel.destroy({ where: { id } });
    }

    /**
     * Convierte un objeto UserModel de Sequelize en un objeto User.
     * @param userModel - El objeto UserModel a convertir.
     * @returns El objeto User correspondiente.
     */
    private mapUserModelToUser(userModel: UserModel): User {
        return {
            id: userModel.id,
            name: userModel.name,
            lastName: userModel.lastName,
            email: userModel.email,
            password: userModel.password,
            username: userModel.username,
            age: userModel.age
        };
    }
}
