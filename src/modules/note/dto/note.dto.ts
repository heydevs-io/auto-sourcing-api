import { ApiProperty } from '@nestjs/swagger';

export class NoteDto {
  @ApiProperty({ example: 'a1b2c3d4-5678-90ef-ghij-klmnopqrstuv' })
  id: string;

  @ApiProperty({ example: 'This is a note' })
  note: string;
}
