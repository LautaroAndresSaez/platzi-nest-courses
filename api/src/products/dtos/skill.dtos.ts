import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsHexColor()
  @IsNotEmpty()
  @ApiProperty()
  readonly color: string;
}

export class UpdateSkillDto extends PartialType(CreateSkillDto) {}
