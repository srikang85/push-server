const redis = require('redis');

 class RedisClient {
    constructor() {
        this.client = redis.createClient( {
            socket: {
                port: 6379
            }
        });
        this.client.connect();
        this.subscriber = this.client.duplicate();
        this.subscriber.connect();
    }

    getClient() {
        return this.client;
    }

    getSubscriber() {
        return this.subscriber;
    }
}

export const redisClient = new RedisClient();