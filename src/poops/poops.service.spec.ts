import { Test, TestingModule } from "@nestjs/testing";
import { PoopsService } from "./poops.service";

describe("PoopsService", () => {
  let service: PoopsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoopsService],
    }).compile();

    service = module.get<PoopsService>(PoopsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
