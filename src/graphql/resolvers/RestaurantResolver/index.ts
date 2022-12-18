import {
  Arg,
  Args,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";

import { db } from "../../../database/db";
import { Restaurant } from "../../schema/Restaurant";
import { RestaurantEntity } from "../../../database/entities/RestaurantEntity";
import { CreateRestaurantArgs } from "./types";
import { User } from "../../schema/User";
import { userInfo } from "../../middleware/userInfo";
import { IGraphQLCotext } from "../../../utils/globalTypes";
import { UserEntity } from "../../../database/entities/UserEntity";

@Resolver(() => Restaurant)
export class RestaurantResolver {
  @FieldResolver()
  async user(@Root() restaurant: Restaurant) {
    return restaurant.user;
  }

  @Query(() => [Restaurant], { nullable: true })
  async restaurants(): Promise<Restaurant[] | null> {
    const restaurantsList = await RestaurantEntity.find({
      relations: ["user"],
    });

    return restaurantsList;
  }

  @Authorized()
  @Mutation(() => Restaurant)
  async createRestaurant(
    @Args()
    {
      name,
      location,
      contact,
      city,
      description,
      website,
      main_img,
    }: CreateRestaurantArgs,
    @Ctx() ctx: IGraphQLCotext
  ) {
    const restaurant = RestaurantEntity.create({
      city,
      location,
      name,
      contact,
      description,
      website,
      main_img,
      user: ctx.currentUser!,
    });

    await restaurant.save();

    return restaurant;
  }
}
