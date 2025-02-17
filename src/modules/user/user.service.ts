import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'database/entities';
import { Repository } from 'typeorm';
import { SourcingBadRequestException } from '../../common/exception';
import { CreateUserDto, UpdateUserDto, UpdateUserStatusDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, payload: UpdateUserDto): Promise<User> {
    const updateResult = await this.userRepository.update(id, payload);
    if (updateResult.affected === 0)
      throw new SourcingBadRequestException('Fail to update user');
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new SourcingBadRequestException('User not found');
    return user;
  }

  async updateStatus(id: string, payload: UpdateUserStatusDto): Promise<User> {
    const updateResult = await this.userRepository.update(id, payload);
    if (updateResult.affected === 0)
      throw new SourcingBadRequestException('Fail to update user');
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new SourcingBadRequestException('User not found');
    return user;
  }

  async create(payload: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: payload.email },
    });
    if (existingUser)
      throw new SourcingBadRequestException('User already exists');
    const user = this.userRepository.create(payload);
    return await this.userRepository.save(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
