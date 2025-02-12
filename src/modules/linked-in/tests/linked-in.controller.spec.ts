import { Test, TestingModule } from '@nestjs/testing';
import { LinkedInController } from './linked-in.controller';
import { LinkedInService } from './linked-in.service';

describe('LinkedInController', () => {
  let controller: LinkedInController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkedInController],
      providers: [LinkedInService],
    }).compile();

    controller = module.get<LinkedInController>(LinkedInController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
