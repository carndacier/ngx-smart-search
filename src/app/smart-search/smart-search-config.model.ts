export class SmartSearchConfig {
    public keys: Array<SmartSearchKey>;
}

export class SmartSearchKey {

    public action: string;
    public keys: Array<string>;

    public isLast: boolean;
    public followings: Array<SmartSearchKey>;
}
