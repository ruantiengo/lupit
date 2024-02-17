import { Injectable } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { PrismaService } from '@utils/prisma/prisma.service';

@Injectable()
export class TransfersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const transfer = await this.prisma.transfer.findMany({
      include: {
        newTeam: {
          select: {
            badge: true,
          },
        },
        oldTeam: {
          select: {
            badge: true,
          },
        },
        player: {
          select: {
            name: true,
            position: true,
          },
        },
      },
    });
    return transfer
      .sort((a, b) => {
        if (a.transferDate > b.transferDate) return -1;
        if (a.transferDate < b.transferDate) return 1;
        return 0;
      })
      .slice(0, 4)
      .map((t) => ({
        oldTeam: t.oldTeam
          ? t.oldTeam.badge
          : 'data:image/png;base64,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',
        newTeam: t.newTeam.badge,
        player: t.player,
      }));
  }

  async create(createTransferDto: CreateTransferDto) {
    const { newTeamId, playerId, oldTeamId } = createTransferDto;
    await this.prisma.transfer.create({
      data: {
        newTeamId,
        oldTeamId,
        transferDate: new Date(),
        playerId,
      },
    });
  }
}
