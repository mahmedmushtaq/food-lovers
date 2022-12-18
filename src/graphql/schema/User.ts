import { Field, ObjectType, ID, Int } from "type-graphql";
import { Base } from "./Base";
import { Restaurant } from "./Restaurant";
import { Column, Entity, OneToMany } from "typeorm";
import { FeedbackEntity } from "../../database/entities/FeedbackEntity";

@ObjectType({ description: "User Schema" })
@Entity()
export class User extends Base {
  @Field({ nullable: false })
  @Column()
  firstName: string;

  @Field({ nullable: false })
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;

  @Field({ nullable: true })
  token?: string;

  @Field({ nullable: true })
  @Column()
  phoneNumber?: string;

  @Field((type) => [Restaurant], { nullable: true })
  @OneToMany(() => Restaurant, (restaurant) => restaurant.user)
  restaurants?: Restaurant[];

  // @OneToMany(() => FeedbackEntity, (feedback) => feedback.user)
  // feedbacks: FeedbackEntity[];
}
