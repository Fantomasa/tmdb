import { Injectable, NotFoundException } from "@nestjs/common";
import { RequestResponseDto } from "@shared/request-response.dto";
import { TmdbService } from "src/tmdb/tmdb.service";

@Injectable()
export class TvService {
  constructor(private readonly tmdbService: TmdbService) {}

  async trending(): Promise<RequestResponseDto> {
    const data = await this.tmdbService.fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
    const randomTV = data.results[Math.floor(Math.random() * data.results?.length)];

    return { success: true, content: randomTV };
  }

  async trailers(id: number) {
    const data = await this.tmdbService.fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
    if (!data.results) throw new NotFoundException(`Movie with ID: ${id} not found`);
    return { success: true, trailers: data.results };
  }

  async details(id: number) {
    const data = await this.tmdbService.fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
    if (!data) throw new NotFoundException(`Movie with ID: ${id} not found`);
    return { success: true, content: data };
  }

  async simular(id: number) {
    const data = await this.tmdbService.fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
    if (!data.results) throw new NotFoundException(`Similar movies with ID: ${id} not found`);
    return { success: true, similar: data.results };
  }
  async getByCategory(category: string) {
    const data = await this.tmdbService.fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
    if (!data.results) throw new NotFoundException(`Movies with category ${category} not found`);
    return { success: true, content: data.results };
  }
}
