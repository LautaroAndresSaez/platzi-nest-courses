import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {}
