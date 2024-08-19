import { Injectable } from "@nestjs/common";

@Injectable()
export class SearchService {
  async findPerson(query: string) {}
  async findMovie(query: string) {}
  async findTV(query: string) {}
  async getHistory() {}
  async removeHistoryItem(id: number) {}
}
