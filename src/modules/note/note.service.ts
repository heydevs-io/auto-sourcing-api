import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Note } from 'database/entities';
import { CreateNoteDto } from './dto/create-note.dto';
import { plainToInstance } from 'class-transformer';
import { NoteDto } from './dto';

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: Repository<Note>) {}

  async create(userId: string, body: CreateNoteDto): Promise<NoteDto> {
    const createNote = this.noteRepository.create({
      ...body,
      userId,
    });
    const saveNote = await this.noteRepository.save(createNote);
    return plainToInstance(NoteDto, saveNote);
  }
}
