import { Rule, RuleType } from '@midwayjs/validate';

export class UserDTO {
  @Rule(RuleType.string())
  id: string;

  @Rule(RuleType.string().required())
  email: string;

  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.array().items(RuleType.string()))
  posts: string[];

  // id    String  @id @default(auto()) @map("_id") @db.ObjectId
  // email String  @unique
  // name  String?
  // posts Post[]
}

export class LoginDTO {
  @Rule(RuleType.string().required().email())
  email: string;

  @Rule(RuleType.string().required())
  password: string;

  // id    String  @id @default(auto()) @map("_id") @db.ObjectId
  // email String  @unique
  // name  String?
  // posts Post[]
  @Rule(RuleType.string())
  username?: string;
}
