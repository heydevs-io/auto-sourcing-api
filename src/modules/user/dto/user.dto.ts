import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserPayload {
  @Expose()
  id: string;
}
