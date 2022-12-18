import { Field, ObjectType, ID, Int } from "type-graphql";
import { Base } from "./Base";
import { Restaurant } from "./Restaurant";
import { Column, OneToMany } from "typeorm";
import { FeedbackEntity } from "../../database/entities/FeedbackEntity";
import { RestaurantEntity } from "../../database/entities/RestaurantEntity";

@ObjectType({ description: "User Schema" })
export class User extends Base {
  @Field({ nullable: false })
  @Column()
  first_name: string;

  @Field({ nullable: false })
  @Column()
  last_name: string;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  @Column()
  phone_number?: string;

  @Field((type) => [Restaurant], { nullable: true })
  @OneToMany(() => Restaurant, (restaurant) => restaurant.user)
  restaurants?: Restaurant[];

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.user)
  feedbacks: FeedbackEntity[];
}
