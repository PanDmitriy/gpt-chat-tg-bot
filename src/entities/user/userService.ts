import { User } from './user';

const users: User[] = []; // Простой пример хранения данных. Заменить на базу данных в будущем.

export function createUser(id: number, username: string, firstName: string, lastName?: string): User {
    const user = { id, username, firstName, lastName };
    users.push(user);
    return user;
}

export function getUserById(id: number): User | undefined {
    return users.find(user => user.id === id);
}
