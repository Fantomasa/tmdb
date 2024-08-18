export interface ContentDto {
  id: number;

  title?: string;

  name?: string;

  adult: boolean;

  release_date?: Date;

  first_air_date?: Date;

  overview: string;
}
