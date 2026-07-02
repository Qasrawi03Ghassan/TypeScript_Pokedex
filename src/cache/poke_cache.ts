export type CacheEntry<T> = {
    createdAt: number,
    val: T
}

export class Cache{
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    public add<T>(key: string,val: T):void{
        let newCacheEntry:CacheEntry<T> = {createdAt:Date.now(),val:val};
        this.#cache.set(key,newCacheEntry);
    }

    public get<T>(key: string):T | undefined{
        if(key === null || key === undefined || this.#cache === undefined || this.#cache.get(key) === undefined)return undefined;
        return this.#cache.get(key)!.val;
    }

    #reap(){
        for(let cacheItem of this.#cache){
            if(Date.now() - this.#interval > 0){
                this.#cache.delete(cacheItem[0]);
            }
        }
    }

    #startReapLoop(){
        const id = setInterval(() => {
            this.#reap();
        },this.#interval);

        this.#reapIntervalId = id;
    }

    stopReapLoop(){
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}