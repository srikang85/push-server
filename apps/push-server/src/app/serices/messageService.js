const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
export const MessageEmitter = new MyEmitter();