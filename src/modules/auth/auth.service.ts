import { UserStatus } from '@enums';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
} from '@environments';
import {
  SourcingBadRequestException,
  SourcingInternalServerError,
} from '@exceptions';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { User } from 'database/entities';
import { Repository } from 'typeorm';
import {
  AuthToken,
  RequestLoginOtpDto,
  RequestLoginOtpResponseDto,
  VerifyLoginOtpDto,
} from './dto';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {
    this.supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
  }

  async requestLoginOtp(
    payload: RequestLoginOtpDto,
  ): Promise<RequestLoginOtpResponseDto> {
    const { email } = payload;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      await this.userRepository.save(
        this.userRepository.create({ email, status: UserStatus.INACTIVE }),
      );
    }

    const { data, error } = await this.supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) throw new SourcingInternalServerError();

    return plainToInstance(RequestLoginOtpResponseDto, {
      message: 'OTP sent to email',
    });
  }

  async verifyLoginOtp(payload: VerifyLoginOtpDto): Promise<AuthToken> {
    const { email, otp } = payload;
    // check if user is active
    const user = await this.userRepository.findOneBy({
      email,
    });
    if (!user) throw new SourcingBadRequestException('User not found');

    await this.userRepository.update(user.id, {
      status: UserStatus.ACTIVE,
    });

    const { data, error } = await this.supabase.auth.verifyOtp({
      token: otp,
      type: 'email',
      email,
    });

    if (error) throw new SourcingBadRequestException(error.message);

    const accessToken = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: ACCESS_TOKEN_SECRET,
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: REFRESH_TOKEN_SECRET,
        expiresIn: REFRESH_TOKEN_EXPIRES_IN,
      },
    );

    return plainToInstance(AuthToken, {
      accessToken,
      refreshToken,
    });
  }
}
