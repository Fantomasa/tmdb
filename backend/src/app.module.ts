import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { TvModule } from './tv/tv.module';
import { SearchModule } from './search/search.module';
import envVars from "./config/envVars";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [envVars] }), AuthModule, MovieModule, TvModule, SearchModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
