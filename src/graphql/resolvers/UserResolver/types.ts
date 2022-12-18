import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class SignUpUserArgs {
  @Field({ nullable: false })
  first_name: string;
  @Field({ nullable: false })
  last_name: string;

  @Field((type) => String, { nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: true })
  phone_number?: string;
}
