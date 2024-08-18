import { IsBoolean, IsDate, IsInt, IsString } from "class-validator";

export class ContentDto {
  @IsInt()
  id: number;

  @IsString()
  title?: string;

  @IsString()
  name?: string;

  @IsBoolean()
  adult: boolean;

  @IsDate()
  release_date?: Date;

  @IsDate()
  first_air_date?: Date;

  @IsString()
  overview: string;
}
