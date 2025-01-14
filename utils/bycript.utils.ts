import bycrpt from 'bcrypt';
const saltRounds = parseInt(Bun.env.BYCRIPT_SALT as string)

const hashPassword = async (password:string) => {
  return await bycrpt.hash(password,saltRounds)
}

const comparePassword = async (password:string,hash:string) => {
  return await bycrpt.compare(password,hash)
}

export { hashPassword, comparePassword }