import jwt from 'jsonwebtoken';

const JWT_SECRET = Bun.env.JWT_SECRET as string;

const jwtsign = async (payload: Number) => {
  return jwt.sign(payload, JWT_SECRET);
} 

const jwtverify = async (token: string) => {
  return jwt.verify(token, JWT_SECRET);
}

export { jwtsign, jwtverify }