import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltRound = 10; //TODO: Import salt from env

  return bcrypt.hash(password, saltRound);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
