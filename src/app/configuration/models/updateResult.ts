import { UpdateType } from "./updateType";

export interface UpdateResult {
  updateType: UpdateType,
  result: boolean,
  error?: string
}