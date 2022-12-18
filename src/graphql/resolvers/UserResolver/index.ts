import {
  Arg,
  Args,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { User } from "../../schema/User";
import { SignUpUserArgs } from "./types";
import { UserEntity } from "../../../database/entities/UserEntity";
import { encodePassword, generateToken } from "../../../utils/helpers";
import { db } from "../../../database/db";
import { Restaurant } from "../../schema/Restaurant";

@Resolver(() => User)
export class UserResolver {
  @FieldResolver(() => [Int], { nullable: true })
  async restaurants(@Root() user: User) {
    return user.restaurants;
  }

  @Query(() => [User], { nullable: true })
  async users(): Promise<User[] | null> {
    const users = await UserEntity.find({ relations: { restaurants: true } });
    console.log("users ", users);
    return users;
  }

  @Mutation(() => User)
  async createUser(
    @Args()
    {
      first_name,
      last_name,
      email,
      password,

      phone_number,
    }: SignUpUserArgs
  ) {
    const user = UserEntity.create({
      first_name,
      last_name,
      email,
      password: await encodePassword(password),
      phone_number,
    });

    await user.save();

    const token = await generateToken({ email, id: user.id });

    return { ...user, token };
  }
}
