export interface Trigger {
  TriggerWords:Array<string>;
  Responses?: Array<string>;
  MessageDelete?: boolean;
  SendRandomResponse?: boolean;
  IgnoreCooldown?: boolean;
  ReactEmote?: Array<string>;
}