import type {User} from "../models/User";
import {UserRepository} from "./UserRepository";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];
  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email == email);

  }

  create(user: User): User {
    this.users.push(user);
    return user;


  }
}

