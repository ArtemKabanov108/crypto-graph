import { ApiProperty } from '@nestjs/swagger';

class SuccessSessionInfo {
  @ApiProperty()
  sessionId: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  expiresAt: string;

  @ApiProperty()
  status: 'ACTIVE' | 'MFA_REQUIRED' | 'MFA_ENROLL';
}

export class SuccessSessionResponseObject {
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  session: SuccessSessionInfo;
}
