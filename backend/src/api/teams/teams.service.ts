import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from '@prisma/client';
import { PrismaService } from '@utils/prisma/prisma.service';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  async create(createTeamDto: CreateTeamDto, badgeUrl: string) {
    const { name } = createTeamDto;
    if (badgeUrl === '' || !name) {
      throw new HttpException(
        'Todos os campos devem ser preenchidos.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newTeam = await this.prisma.team.create({
      data: {
        name,
        badge: badgeUrl,
      },
    });

    return newTeam;
  }

  async findAll(): Promise<Team[]> {
    const teams = await this.prisma.team.findMany();
    return teams;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto, badgeUrl: string) {
    const { name } = updateTeamDto;
    if (!name) {
      throw new HttpException(
        'Por favor preencha o campo nome.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const entity = await this.prisma.team.findFirst({
      where: {
        id: id,
      },
    });
    if (!entity)
      throw new HttpException('Erro, não existe um time com esse id', 400);
    entity.name = name;
    if (badgeUrl !== '') {
      entity.badge = badgeUrl;
    }
    let res;
    if (badgeUrl !== '') {
      res = await this.prisma.team.update({
        data: {
          name,
          badge: badgeUrl,
        },
        where: {
          id: id,
        },
      });
    } else {
      res = await this.prisma.team.update({
        data: {
          name,
        },
        where: {
          id: id,
        },
      });
    }

    return res;
  }

  async remove(id: string) {
    return await this.prisma.team.delete({
      where: {
        id,
      },
    });
  }
}
