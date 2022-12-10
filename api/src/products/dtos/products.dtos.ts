import { CreateCategoryDTO } from './category.dtos';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User name' })
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly price: number;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly stock: number;
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @ValidateNested()
  @IsNotEmpty()
  @ApiProperty()
  readonly category: CreateCategoryDTO;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  readonly brand: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @ValidateIf((params) => params.maxPrice)
  @IsPositive()
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  maxPrice: number;
}
