import { Team } from '@prisma/client';

export const fakeTeams: Team[] = [
  {
    badge: '1.png',
    name: '1',
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const prismaMockTeams = {
  team: {
    create: jest.fn().mockReturnValue(fakeTeams[0]),
    findMany: jest.fn().mockResolvedValue(fakeTeams),
    update: jest.fn().mockResolvedValue(fakeTeams[0]),
    delete: jest.fn(),
  },
};
