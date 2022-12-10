import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;
}
