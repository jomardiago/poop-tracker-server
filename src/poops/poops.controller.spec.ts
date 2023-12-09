import { Test, TestingModule } from "@nestjs/testing";
import { PoopsController } from "./poops.controller";
import { PoopsService } from "./poops.service";

describe("PoopsController", () => {
  let controller: PoopsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoopsController],
      providers: [PoopsService],
    }).compile();

    controller = module.get<PoopsController>(PoopsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
