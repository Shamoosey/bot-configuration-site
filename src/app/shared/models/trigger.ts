export interface Trigger {
  id: string;
  name: string;
  messageDelete: boolean;
  sendRandomResponse: boolean;
  ignoreCooldown: boolean;
  triggerWords: Array<string>;
  reactEmotes: Array<string>;
  triggerResponses: Array<string>;
}