import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaService } from '@utils/prisma/prisma.service';
import { TeamsModule } from '@api/teams/teams.module';
import { PlayersModule } from '@api/players/players.module';
import { TransfersModule } from '@api/transfers/transfers.module';

@Module({
  imports: [TeamsModule, PlayersModule, TransfersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
