import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
    Param,
    Post,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { User } from './user.entity';
  
  @Controller('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    //create one user
    @Post()
    @HttpCode(HttpStatus.OK)
    async createUser(@Body() userData: Partial<User>): Promise<User> {
      try {
        return await this.userService.createUser(userData);
      } catch (error) {
        if (error instanceof InternalServerErrorException) {
          throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        } else {
          throw new HttpException('Invalid user data', HttpStatus.BAD_REQUEST);
        }
      }
    }
  
    //check user if exist
    @Get(':username')
    @HttpCode(HttpStatus.OK)
    async checkIfUserExist(@Param('username') username: string): Promise<User> {
      try {
        return await this.userService.findOne(username);
      } catch (error) {
        if (error instanceof InternalServerErrorException) {
          throw new HttpException(
            error.message,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        } else {
          throw new HttpException('Invalid user data', HttpStatus.BAD_REQUEST);
        }
      }
    }
  }