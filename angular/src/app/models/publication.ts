export class Publication {
    constructor(
        public id: string,
        public userId: string,
        public message: string,
        public createdAt: string,
        public image: Blob,
        public type:string,
        public name:string,
        public updateAt:string
    ) {}
}
