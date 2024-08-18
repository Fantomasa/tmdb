import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
// import {}

@Injectable()
export class TmdbService {
  private readonly tmdbApiKey: string;
  constructor(private readonly envConfig: ConfigService) {
    this.tmdbApiKey = envConfig.get<string>("TMDB");
  }

  async fetchFromTMDB(url: string): Promise<any> {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.tmdbApiKey}`
      }
    };

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error(`Failed to fetch data from TMDB: ${res.statusText}`);
    }

    return await res.json();
  }
}
