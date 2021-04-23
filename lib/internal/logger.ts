import pino from "pino";

const pinoConfig = {
  prettyPrint: {
    colorize: true,
    levelFirst: true,
  },
};

const logger = pino(pinoConfig);

export const log = (msg: any) => logger.info(msg);
export default logger;
