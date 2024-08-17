import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import envVars from "./config/envVars";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [envVars] })],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
