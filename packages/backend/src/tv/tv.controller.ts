import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { TvService } from "./tv.service";

@Controller("tv")
export class TvController {
  constructor(private readonly tvService: TvService) {}

  @Get("/trending")
  trending() {
    return this.tvService.trending();
  }

  @Get(":id/trailers")
  trailers(@Param("id", ParseIntPipe) id: number) {
    return this.tvService.trailers(id);
  }
  @Get(":id/details")
  details(@Param("id", ParseIntPipe) id: number) {
    return this.tvService.details(id);
  }
  @Get(":id/similar")
  similar(@Param("id", ParseIntPipe) id: number) {
    return this.tvService.simular(id);
  }
  @Get(":category")
  category(@Param("category") category: string) {
    return this.tvService.getByCategory(category);
  }
}
