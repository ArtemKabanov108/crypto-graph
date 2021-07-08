// import {SessionStatus} from "@okta/okta-sdk-nodejs/src/types/models/SessionStatus";

export default interface ISuccessSessionResponse {
    // session: ISession
    email: string
    // firstName: string
    // lastName: string
    // isActive: boolean,
    // city: string,
    // country: string
    // role: string
}

export interface ISession {
    sessionId: string,
    createdAt: string,
    expiresAt: string,
    // status: SessionStatus
}

