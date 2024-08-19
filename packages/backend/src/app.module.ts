import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { MovieModule } from "./movie/movie.module";
import { TvModule } from "./tv/tv.module";
import { SearchModule } from "./search/search.module";
import { TmdbService } from "./tmdb/tmdb.service";
import { TmdbModule } from "./tmdb/tmdb.module";
import envVars from "./config/envVars";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    TmdbModule,
    AuthModule,
    MovieModule,
    TvModule,
    SearchModule,
    TmdbModule,
    ConfigModule.forRoot({ isGlobal: true, load: [envVars], envFilePath: ".env" }),
    MongooseModule.forRoot(process.env.MONGO_URI)
  ],
  controllers: [AppController],
  providers: [AppService, TmdbService]
})
export class AppModule {}
