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
} from "type-graphql";

import { Restaurant } from "../../schema/Restaurant";
import { CreateRestaurantArgs } from "./types";
import { IGraphQLCotext } from "../../../utils/globalTypes";

@Resolver(() => Restaurant)
export class RestaurantResolver {
  @FieldResolver()
  async user(@Root() restaurant: Restaurant) {
    return restaurant.user;
  }

  @Query(() => [Restaurant], { nullable: true })
  async restaurants(): Promise<Restaurant[] | null> {
    const restaurantsList = await Restaurant.find({
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
      mainImg,
    }: CreateRestaurantArgs,
    @Ctx() ctx: IGraphQLCotext
  ) {
    const restaurant = Restaurant.create({
      city,
      location,
      name,
      contact,
      description,
      website,
      mainImg,
      user: ctx.currentUser!,
    });

    await restaurant.save();

    return restaurant;
  }
}
