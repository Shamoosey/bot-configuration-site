export interface ConfigurationUpdate {
  serverId: string,
  defaultChannel: string,
  enableKickCache: boolean,
  kickCacheDays: number,
  kickCacheHours: number,
  kickCacheServerMessage: string,
  kickCacheUserMessage: string,
  name: string
}