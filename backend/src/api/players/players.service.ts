import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from '@utils/prisma/prisma.service';
import { TransfersService } from '@api/transfers/transfers.service';

@Injectable()
export class PlayersService {
  constructor(
    private prisma: PrismaService,
    private transferService: TransfersService,
  ) {}

  async create(createPlayerDto: CreatePlayerDto) {
    const { birthDay, name, salary, teamId, position } = createPlayerDto;
    if (!birthDay || !name || !salary || !teamId) {
      throw new HttpException(
        'Todos os campos devem ser preenchidos.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newPlayer = await this.prisma.player.create({
      data: {
        birthDay,
        name,
        salary,
        teamId,
        position,
      },
      include: {
        team: true,
      },
    });
    if (newPlayer) {
      await this.transferService.create({
        newTeamId: newPlayer.teamId,
        playerId: newPlayer.id,
        oldTeamId: null,
      });
    }
    return {
      id: newPlayer.id,
      name: newPlayer.name,
      birthDay: newPlayer.birthDay,
      team: newPlayer.team.name,
      teamId: newPlayer.team.id,
      salary: newPlayer.salary,
      position: newPlayer.position,
      age: this.calculateAge(newPlayer.birthDay, new Date()),
    };
  }

  async findAll() {
    const players = await this.prisma.player.findMany({
      include: {
        team: true,
      },
    });
    return players.map((p) => {
      return {
        id: p.id,
        name: p.name,
        birthDay: p.birthDay,
        team: p.team.name,
        teamId: p.team.id,
        salary: p.salary,
        position: p.position,
        age: this.calculateAge(p.birthDay, new Date()),
      };
    });
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto) {
    const { birthDay, name, salary, teamId } = updatePlayerDto;

    const entity = await this.prisma.player.findFirst({
      where: {
        id,
      },
    });
    if (!entity)
      throw new HttpException('Erro, não existe um player com esse id', 400);

    const updatedPlayer = await this.prisma.player.update({
      data: {
        name,
        birthDay,
        salary,
        teamId,
      },
      where: {
        id: entity.id,
      },
      include: {
        team: true,
      },
    });
    if (updatedPlayer.teamId !== entity.teamId) {
      await this.transferService.create({
        newTeamId: teamId,
        playerId: id,
        oldTeamId: entity.teamId,
      });
    }

    return {
      id: updatedPlayer.id,
      name: updatedPlayer.name,
      birthDay: updatedPlayer.birthDay,
      team: updatedPlayer.team.name,
      teamId: updatedPlayer.team.id,
      salary: updatedPlayer.salary,
      position: updatedPlayer.position,
      age: this.calculateAge(updatedPlayer.birthDay, new Date()),
    };
  }

  async remove(id: string) {
    return await this.prisma.player.delete({
      where: {
        id,
      },
    });
  }

  private calculateAge(dateOfBirth: Date, currentDate: Date): number {
    const dob = new Date(dateOfBirth);
    const now = currentDate || new Date();

    let age = now.getFullYear() - dob.getFullYear();
    const monthDiff = now.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
      age--;
    }
    if (age < 0) return 0;

    return age;
  }
}
