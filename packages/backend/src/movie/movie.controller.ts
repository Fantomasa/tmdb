import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { MovieService } from "./movie.service";

@Controller("movie")
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get("/trending")
  trending() {
    return this.movieService.trending();
  }

  @Get("/:id/trailers")
  trailers(@Param("id", ParseIntPipe) id: number) {
    return this.movieService.trailers(id);
  }

  @Get("/:id/details")
  details(@Param("id", ParseIntPipe) id: number) {
    return this.movieService.details(id);
  }

  @Get("/:id/similar")
  similar(@Param("id", ParseIntPipe) id: number) {
    return this.movieService.similar(id);
  }
  @Get("/:category")
  category(@Param("category") category: string) {
    return this.movieService.moviesByCategory(category);
  }
}
