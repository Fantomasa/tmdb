import { Injectable } from "@nestjs/common";
import { ContentDto } from "./dto/trending-movie.dto";
import { TmdbService } from "src/tmdb/tmdb.service";
import { RequestResponseDto } from "./dto/request-response.dto";

@Injectable()
export class MovieService {
  constructor(private readonly tmdbService: TmdbService) {}

  async trending(): Promise<RequestResponseDto> {
    const data = await this.tmdbService.fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

    return { success: true, content: randomMovie };
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, trendingMovie: ContentDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
