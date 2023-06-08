export class User {
    constructor(
        readonly id: string,
        readonly email: string,
        readonly password: string,
        readonly username: string,
        readonly name: string,
        readonly lastName: string,
        readonly age: number
    ) { }
}