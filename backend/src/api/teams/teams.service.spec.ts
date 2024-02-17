import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { PrismaService } from '@utils/prisma/prisma.service';
import { fakeTeams, prismaMockTeams } from '../../../test/prisma-mock';

describe('TeamsService', () => {
  let service: TeamsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        { provide: PrismaService, useValue: prismaMockTeams },
      ],
      imports: [],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it(`should return an array of posts`, async () => {
      const response = await service.findAll();

      expect(response).toEqual(fakeTeams);
      expect(prisma.team.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it(`should create a new post`, async () => {
      const response = await service.create(fakeTeams[0], '1.png');

      expect(response).toBe(fakeTeams[0]);
      expect(prisma.team.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteOne', () => {
    it(`should delete post and return empty body`, async () => {
      expect(await service.remove('1')).toBeUndefined();
      expect(prisma.team.delete).toHaveBeenCalledTimes(1);
      expect(prisma.team.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });
});
