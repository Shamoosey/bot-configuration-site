import { Trigger } from "./trigger";
import { User } from "./user";

export interface Configuration {
  id?: string
  enableKickCache: boolean;
  kickCacheDays: number;
  kickCacheHours: number;
  name:string;
  kickCacheServerMessage: string;
  kickCacheUserMessage: string;
  defaultChannel: string;
  serverId: string;
  triggers: Array<Trigger>;
  users: Array<User>;
}