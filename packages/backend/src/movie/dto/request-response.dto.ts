import { IsBoolean, IsString } from "class-validator";
import { ContentDto } from "./trending-movie.dto";

export class RequestResponseDto {
  @IsBoolean()
  success: boolean;

  @IsString()
  message?: string;

  content: ContentDto;
}
