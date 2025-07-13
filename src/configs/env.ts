import dotenv from "dotenv";

dotenv.config();

interface ENV_VARS {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
  JWT_ACCESS_TOKEN_EXPIRES: string;
  JWT_SECRET: string;
}

const loadEnvVars = (): ENV_VARS => {
  const envArray: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "JWT_ACCESS_TOKEN_EXPIRES",
    "JWT_SECRET",
  ];

  envArray.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Required env variables not found: ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as string,
    JWT_ACCESS_TOKEN_EXPIRES: process.env.JWT_ACCESS_TOKEN_EXPIRES as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
  };
};

export const envVars = loadEnvVars();
