import { Test, TestingModule } from '@nestjs/testing';
import { PhoneEntryController } from './phone-entry.controller';
import { PhoneEntryService } from './phone-entry.service';

describe('PhoneEntryController', () => {
  let controller: PhoneEntryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneEntryController],
      providers: [PhoneEntryService],
    }).compile();

    controller = module.get<PhoneEntryController>(PhoneEntryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
