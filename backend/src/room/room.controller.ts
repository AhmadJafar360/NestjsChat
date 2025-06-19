import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { RoomsService } from './room.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async create(@Body() body: { name: string }, @Request() req) {
    return this.roomsService.create(body.name, req.user.userId);
  }

  @Get()
  async findAll() {
    return this.roomsService.findAll();
  }
}
