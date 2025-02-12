import { PartialType } from '@nestjs/mapped-types';
import { CreateLinkedInDto } from './create-linked-in.dto';

export class UpdateLinkedInDto extends PartialType(CreateLinkedInDto) {}
