import { ContentDto } from "./content.dto";

export class RequestResponseDto {
  success: boolean;

  message?: string;

  content: ContentDto;
}
