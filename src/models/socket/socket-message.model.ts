export default class SocketMessage {
    type = "message";

    // eslint-disable-next-line no-useless-constructor
    constructor(public data: any, public isError = false, private createdAt = Date.now()) {}
}
