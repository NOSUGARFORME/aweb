import { JwtModuleOptions } from '@nestjs/jwt';

export const getJwtConfig = async (): Promise<JwtModuleOptions> => {
  return {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '24h' },
  };
};
