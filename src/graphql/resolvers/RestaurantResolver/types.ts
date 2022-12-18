import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class CreateRestaurantArgs {
  @Field()
  name: string;

  @Field()
  location: string;

  @Field()
  contact: string;

  @Field()
  city: string;

  @Field()
  mainImg: string;

  @Field((type) => Int, { nullable: true })
  rating: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  website?: string;
}
