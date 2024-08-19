import { Injectable, NotFoundException } from "@nestjs/common";
import { TmdbService } from "src/tmdb/tmdb.service";
import { RequestResponseDto } from "@shared/request-response.dto";

@Injectable()
export class MovieService {
  constructor(private readonly tmdbService: TmdbService) {}

  async trending(): Promise<RequestResponseDto> {
    const data = await this.tmdbService.fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

    return { success: true, content: randomMovie };
  }

  async trailers(id: number): Promise<RequestResponseDto> {
    const data = await this.tmdbService.fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
    if (!data.results) throw new NotFoundException(`Movie with ID: ${id} not found`);
    return { success: true, trailers: data.results };
  }

  async details(id: number): Promise<RequestResponseDto> {
    const data = await this.tmdbService.fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
    if (!data) throw new NotFoundException(`Movie with ID: ${id} not found`);
    return { success: true, content: data };
  }

  async similar(id: number): Promise<RequestResponseDto> {
    const data = await this.tmdbService.fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
    if (!data.results) throw new NotFoundException(`Similar movies with ID: ${id} not found`);
    return { success: true, similar: data.results };
  }

  async moviesByCategory(category: string): Promise<RequestResponseDto> {
    const data = await this.tmdbService.fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
    if (!data.results) throw new NotFoundException(`Movies with category ${category} not found`);
    return { success: true, content: data.results };
  }
}
