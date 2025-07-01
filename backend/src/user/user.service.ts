import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { User } from './user.entity';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import * as bcrypt from 'bcrypt';
  
  @Injectable()
  export class UserService {
    constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
    ) {}
  
    SALT_ROUNDS = 10;
  
    // find one user
    async findOne(username: string): Promise<User> {
      return await this.userRepository.findOneBy({ username });
    }
  
    // create one user
    async createUser(userData: Partial<User>): Promise<User> {
      const { username, password } = userData;
  
      // Check if the user already exists
      const existingUser = await this.findOne(username);
      if (existingUser) {
        throw new ConflictException('Email is already taken');
      }
  
      try {
        const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
        const user = this.userRepository.create({
          username: username,
          password: hashedPassword,
        });
  
        if (username && password) {
          return await this.userRepository.save({
            username: user.username,
            password: user.password,
          });
        }
      } catch (error) {
        console.error('Error creating user:', error);
        throw new InternalServerErrorException('Failed to create user');
      }
    }
  }