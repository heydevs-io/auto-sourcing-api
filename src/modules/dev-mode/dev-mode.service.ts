import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthToken } from '../auth/dto';
import { UserService } from '../user/user.service';
import { SourcingBadRequestException } from '@exceptions';

@Injectable()
export class DevModeService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async getAccessTokenByEmail(email: string): Promise<AuthToken> {
    const payload = await this.userService.getUserByEmail(email);
    if (!payload) throw new SourcingBadRequestException('User not found');
    return {
      accessToken: this.authService.generateToken({ id: payload.id }),
    };
  }
}
