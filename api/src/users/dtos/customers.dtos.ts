import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateSkillDto } from 'src/products/dtos/skill.dtos';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateSkillDto)
  @ApiProperty()
  readonly skills: CreateSkillDto[];
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
