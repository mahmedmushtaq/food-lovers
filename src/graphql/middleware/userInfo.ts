import { MiddlewareFn } from "type-graphql";
import { validateToken } from "../../utils/helpers";
import { Request } from "express";
import { IGraphQLCotext } from "../../utils/globalTypes";

export const userInfo: MiddlewareFn<IGraphQLCotext> = async (
  { context },
  next
) => {
  context.currentUser = { email: "string", id: 1 };
  next();
};
