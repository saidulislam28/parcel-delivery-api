import dotenv from "dotenv";

dotenv.config();

interface ENV_VARS {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
}

const loadEnvVars = (): ENV_VARS => {
  const envArray: string[] = ["PORT", "DB_URL", "NODE_ENV"];

  envArray.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Required env variables not found: ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as string,
  };
};

export const envVars = loadEnvVars();
