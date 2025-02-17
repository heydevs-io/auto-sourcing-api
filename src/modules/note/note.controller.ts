import { Body, Controller, Post } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto';
import { CurrentUser, SourcingApiResponse } from '@decorators';
import { User } from 'database/entities';
import { NoteDto } from './dto/note.dto';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  @SourcingApiResponse(NoteDto)
  async createNote(
    @Body() body: CreateNoteDto,
    @CurrentUser() user: User,
  ): Promise<NoteDto> {
    return this.noteService.create(user.id, body);
  }
}
