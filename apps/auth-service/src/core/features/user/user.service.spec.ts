import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { mock, mockReset } from 'jest-mock-extended';
import DbClient from '@/core/db/db.type';
import { DB_CLIENT } from '@/core/db/db.provider';

describe('UserService', () => {
  const mockDbClient = mock<DbClient>();
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: DB_CLIENT, useValue: mockDbClient }]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    mockReset(mockDbClient);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
