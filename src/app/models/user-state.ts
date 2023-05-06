import { User } from "firebase/auth";

export class UserState {
  readonly status: UserStatus
  readonly value: User | undefined | null
  constructor(value: User | undefined | null) {
    if(value === undefined){
      this.status = UserStatus.Unknown
    } else {
      if(value === null) {
        this.status = UserStatus.SignedOut;
      } else {
        this.status = UserStatus.SignedIn;
      }
    }

    this.value = value
  }
}

export enum UserStatus {
  Unknown = "Unknown",
  SignedIn = "SignedIn",
  SignedOut = "SignedOut"
}