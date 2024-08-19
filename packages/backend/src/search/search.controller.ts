import { Controller, Get, Param, Delete, ParseIntPipe } from "@nestjs/common";
import { SearchService } from "./search.service";

@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get("person/:query")
  findPerson(@Param("query") query: string) {
    return this.searchService.findPerson(query);
  }
  @Get("movie/:query")
  findMovie(@Param("query") query: string) {
    return this.searchService.findMovie(query);
  }
  @Get("tv/:query")
  findTV(@Param("query") query: string) {
    return this.searchService.findTV(query);
  }

  @Get("history")
  findOne() {
    return this.searchService.getHistory();
  }

  @Delete("history/:id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.searchService.removeHistoryItem(id);
  }
}
