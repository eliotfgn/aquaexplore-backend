import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { CreateUserDto } from '@aquaexplore/types';

describe('AuthService', () => {
  let service: AuthService;
  const userServiceMock: DeepMockProxy<UserService> = mockDeep<UserService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Registration', () => {
    it('Should throw error when email already exists', async () => {
      //Given
    });
  });
});
