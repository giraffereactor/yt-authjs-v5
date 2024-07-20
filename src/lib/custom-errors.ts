import { AuthError } from "next-auth";

export class OAuthAccountAlreadyLinkedError extends AuthError {
  static type = "OAuthAccountAlreadyLinked";
}
