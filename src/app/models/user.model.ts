import { Gender } from '../common/enums/gender.enum';
import { Permission } from '../common/enums/permission.enum';
import { Role } from '../common/enums/role.enum';
import { Contact } from '../common/interfaces/contact.interface';

export interface User {
  id: string;
  fullName?: string;
  dateOfBirth?: Date;
  email: string;
  contacts: Contact[];
  gender?: Gender;
  roles: Role[];
  permissions: Permission[]
}
