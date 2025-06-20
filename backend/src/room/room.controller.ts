import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { RoomsService } from './room.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  // Buat Room (dengan user pembuat)
  @Post()
  async create(@Body() body: { name: string }, @Request() req) {
    const userId = req.user.userId;
    return this.roomsService.create(body.name, userId);
  }

  // Ambil semua Room
  @Get()
  async getRooms() {
    return this.roomsService.findAll();
  }
}
