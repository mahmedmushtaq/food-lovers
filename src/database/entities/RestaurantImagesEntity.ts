import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { Base } from "./BaseEntity";
import { Restaurant } from "../../graphql/schema/Restaurant";

@Entity("restaurant_images")
export class RestaurantImagesEntity extends Base {
  @Column()
  src: string;

  // @ManyToOne(() => Restaurant, (restaurant) => restaurant.images)
  // @JoinColumn({ name: "restaurant_id" })
  // restaurant: Restaurant;
}
