require("dotenv").config();

const secretKey = process.env.SECRET;

const generateToken = (user = {}) => {
  const { id, username, role } = user
  return {
    ...user,
    token: jwt.sign({ sub: { id, username, roleName: role.name } }, JWT_SECRET)
  }
}
