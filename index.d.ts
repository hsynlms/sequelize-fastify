import { FastifyPluginCallback } from "fastify";
import { Sequelize, Options } from "sequelize";

export type Sequelize = Sequelize;

export interface SequelizePluginOptions {
  /**
   * @default "sequelize"
   *
   *
   * @example
   *
   * In order to have typing for the fastify instance, you should follow the example:
   *
   * ```
   * import { Sequelize } from "sequelize-fastify";
   *
   * declare module "fastify" {
   *   interface FastifyInstance {
   *     [instance]: Sequelize;
   *   }
   * }
   * ```
   */
  instance?: string;

  /**
   * Options to create sequelize instance
   */
  sequelizeOptions: Options;
}

declare const sequelizePlugin: FastifyPluginCallback<SequelizePluginOptions>;

export default sequelizePlugin;
