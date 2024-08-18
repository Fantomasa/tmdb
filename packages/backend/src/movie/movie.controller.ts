import { Controller, Get, Param } from "@nestjs/common";
import { MovieService } from "./movie.service";

@Controller("movie")
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get("/trending")
  trending() {
    return this.movieService.trending();
  }

  @Get("/:id/trailers")
  trailers(@Param("id") id: string) {
    return `${id} Trailers`;
  }

  @Get("/:id/details")
  details(@Param("id") id: string) {
    return `${id} Details`;
  }

  @Get("/:id/similar")
  similar(@Param("id") id: string) {
    return `${id} Similar`;
  }
  @Get("/:category")
  category(@Param("category") category: string) {
    return `${category} category`;
  }
}
