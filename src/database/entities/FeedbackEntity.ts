import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "./BaseEntity";
import { User } from "../../graphql/schema/User";

@Entity({ name: "feedback" })
export class FeedbackEntity extends Base {
  @Column()
  description: string;

  @Column({ type: "numeric" })
  rating: number;

  // @ManyToOne(() => User, (user) => user.feedbacks)
  // @JoinColumn({ name: "user_id" })
  // user: User;
}
