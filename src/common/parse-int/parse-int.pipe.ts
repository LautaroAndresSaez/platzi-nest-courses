import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const parseValue = parseInt(value);
    if (isNaN(parseValue)) {
      throw new HttpException('Id is not a number', HttpStatus.BAD_REQUEST);
    }
    return parseValue;
  }
}
