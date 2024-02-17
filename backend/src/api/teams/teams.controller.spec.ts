import { AzureStorageService } from '@nestjs/azure-storage';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateTeamDto } from './dto/create-team.dto';
import { faker } from '@faker-js/faker';
import { UpdateTeamDto } from './dto/update-team.dto';

describe('TeamsController create()', () => {
  let teamsService: TeamsService;
  let azureBlobStorage: AzureStorageService;
  let controller: TeamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [
        {
          provide: TeamsService,
          useValue: {
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: AzureStorageService,
          useValue: {
            upload: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TeamsController>(TeamsController);
    teamsService = module.get<TeamsService>(TeamsService);
    azureBlobStorage = module.get<AzureStorageService>(AzureStorageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a team', async () => {
      const createTeamDto: CreateTeamDto = {
        name: faker.person.firstName(),
        file: faker.image.url(),
        id: faker.datatype.uuid(),
      };
      const storageUrl = '';
      (azureBlobStorage.upload as jest.Mock).mockResolvedValue(storageUrl);

      await controller.create(createTeamDto);

      expect(teamsService.create).toHaveBeenCalledWith(createTeamDto, '');
    });

    it('should handle service exception during create', async () => {
      const createTeamDto: CreateTeamDto = {
        name: faker.person.firstName(),
        file: faker.image.url(),
        id: faker.datatype.uuid(),
      };

      // Simulando exceção lançada pelo serviço durante a criação
      (teamsService.create as jest.Mock).mockRejectedValue(
        new Error('Team creation failed'),
      );

      await expect(controller.create(createTeamDto)).rejects.toThrowError(
        'Team creation failed',
      );
    });
  });

  describe('update', () => {
    it('should update a team', async () => {
      const id = 'some-id';
      const updateTeamDto: UpdateTeamDto = {
        name: faker.person.firstName(),
      };
      const storageUrl = '';
      (azureBlobStorage.upload as jest.Mock).mockResolvedValue(storageUrl);

      await controller.update(id, updateTeamDto);

      expect(teamsService.update).toHaveBeenCalledWith(id, updateTeamDto, '');
    });
    it('should handle service exception during update', async () => {
      const id = 'some-id';
      const updateTeamDto: UpdateTeamDto = {
        name: faker.person.firstName(),
      };

      // Simulando exceção lançada pelo serviço durante a atualização
      (teamsService.update as jest.Mock).mockRejectedValue(
        new Error('Team update failed'),
      );

      await expect(controller.update(id, updateTeamDto)).rejects.toThrowError(
        'Team update failed',
      );
    });
  });

  describe('remove', () => {
    it('should remove a team', async () => {
      const id = faker.database.mongodbObjectId();
      await controller.remove(id);

      expect(teamsService.remove).toHaveBeenCalledWith(id);
    });

    it('should handle service exception during remove', async () => {
      const id = faker.database.mongodbObjectId();

      // Simulando exceção lançada pelo serviço durante a remoção
      (teamsService.remove as jest.Mock).mockRejectedValue(
        new Error('Team removal failed'),
      );

      await expect(controller.remove(id)).rejects.toThrowError(
        'Team removal failed',
      );
    });
  });
});
