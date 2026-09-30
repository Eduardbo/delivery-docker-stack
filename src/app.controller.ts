import { Controller, Get, Post, Patch, Put, Delete, Body, Param, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service.js';
import { User } from './users/user.entity.js'

@Controller("users")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async addUser(@Body() user:Partial<User> ): Promise<User> {
    return this.appService.addUser(user);
  }

  @Get(":id")
  async getUser(@Param("id", ParseIntPipe) id: number): Promise<User>{
    const user  = await this.appService.getUser(id);
    
    if(!user){
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }
}
