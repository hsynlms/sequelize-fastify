import { FastifyPluginCallback } from "fastify";
import { Sequelize, Options } from "sequelize";

declare module "fastify" {
  interface FastifyInstance {
    sequelize: Sequelize;
  }
}

export interface SequelizePluginOptions {
  /**
   * @default "sequelize"
   */
  instance?: string;

  /**
   * Options to create sequelize instance
   */
  sequelizeOptions: Options;
}

declare const sequelizePlugin: FastifyPluginCallback<SequelizePluginOptions>;

export default sequelizePlugin;
