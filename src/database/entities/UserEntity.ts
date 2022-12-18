import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "./BaseEntity";
import { FeedbackEntity } from "./FeedbackEntity";
import { RestaurantEntity } from "./RestaurantEntity";

@Entity({ name: "user" })
export class UserEntity extends Base {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  email_verified: boolean;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone_number?: string;

  @OneToMany(() => FeedbackEntity, (feedback) => feedback.user)
  feedbacks: FeedbackEntity[];

  @OneToMany(() => RestaurantEntity, (restaurant) => restaurant.user)
  restaurants: RestaurantEntity[];
}
