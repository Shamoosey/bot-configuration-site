export interface Configuration {
  EnableKickerCache: boolean;
  KickCacheDays: number;
  KickCacheHours: number;
  KickServerMessage: string;
  KickedUserMessage: string;
  DefaultChannel: string;
  GuildId: string;
  SecretUsers: Array<string>;
}