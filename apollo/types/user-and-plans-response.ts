import { Plan } from "./plan";
import { User } from "./user";

export interface UserAndPlansResponse {
  user: User;
  userPlans: { plans: Plan[] };
}