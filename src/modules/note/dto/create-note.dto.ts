import { IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  note: string;

  @IsNotEmpty()
  candidateId: string;
}
