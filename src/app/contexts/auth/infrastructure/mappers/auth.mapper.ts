import { AuthSession } from '../../domain/models';
import { AuthResponseDto } from '../dto';

export class AuthMapper {
  static toSession(dto: AuthResponseDto): AuthSession {
    return {
      user: {
        userId: dto.user.userId,
        email: dto.user.email,
        status: dto.user.status,
      },
      sessionToken: dto.sessionToken,
      refreshToken: dto.refreshToken,
    };
  }
}

