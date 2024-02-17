import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { PrismaService } from '@utils/prisma/prisma.service';
import { TransfersService } from '@api/transfers/transfers.service';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService, PrismaService, TransfersService],
})
export class PlayersModule {}
