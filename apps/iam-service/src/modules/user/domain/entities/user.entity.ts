import { EUserStatus } from 'apps/iam-service/src/modules/user/domain/enums/user-status.enum';

export class User {
  id: string;
  tenantId: string;
  email: string;
  username: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  status: EUserStatus;
  emailVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
