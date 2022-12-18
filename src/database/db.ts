import { DataSource, DeepPartial, EntityTarget, ObjectLiteral } from "typeorm";
import { config } from "../config";
import { UserEntity } from "./entities/UserEntity";
import { RestaurantEntity } from "./entities/RestaurantEntity";
import { RestaurantImagesEntity } from "./entities/RestaurantImagesEntity";
import { FeedbackEntity } from "./entities/FeedbackEntity";
import { User } from "../graphql/schema/User";
import { Restaurant } from "../graphql/schema/Restaurant";

class SetupConnection {
  private _appDataSource: DataSource;
  private _entities = [
    User,
    Restaurant,
    RestaurantImagesEntity,
    FeedbackEntity,
  ];

  get entities() {
    return this._entities;
  }

  async connect() {
    this._appDataSource = new DataSource({
      type: config.dbType,
      host: config.dbHost!,
      port: config.dbPort,
      username: config.dbUsername,
      password: config.dbPassword,
      database: config.dbName,
      entities: this.entities,
      synchronize: true,
    });

    try {
      await this._appDataSource.initialize();
      console.log("Data Source has been initialized!");
    } catch (err) {
      console.error("Error during Data Source initialization", err);
    }
  }

  get dataSource() {
    return this._appDataSource;
  }

  async save(
    entity: EntityTarget<ObjectLiteral>,
    record: DeepPartial<ObjectLiteral>
  ) {
    const userRepository = db.dataSource.getRepository(entity);
    await userRepository.save(record);
  }
}

export const db = new SetupConnection();
