const getToken = ({ headers }: { headers: any }): string => {
  const token = headers.authorization;
  if (!token) {
    throw {
      name: "Unauthorized",
      message: "Você precisa submitar um token",
      statusCode: 401,
      errorCode: 401,
    };
  }

  return token;
};

export default getToken;
