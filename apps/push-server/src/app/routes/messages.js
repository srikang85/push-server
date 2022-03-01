import { setSSEHeader } from './SSEUtil';
import { MessageEmitter } from './../serices/messageService';
import { ESRCH } from 'constants';
import { SecretService } from './../serices/secretService';
import { redisClient } from './../serices/redisClient';

module.exports = function(router, VERSION) {
  
    const handleMessageCreation = function (req, res) {      
      const message = req.body;
      redisClient.getClient().publish(message?.data?.client, JSON.stringify(message?.data));
      //MessageEmitter.emit(message?.data?.client, message?.data);
      res.status(200).send({
          success: true,
          message: 'Message Received'
      }).end();
    };

    const handleGetMessage = function (req, res) {
        const data = {
            success: true,
            message: 'User successfully authenticated'
        };
        const id = req.params?.id;
        console.log(`Listeners ${id}`);
        setSSEHeader(res);
        redisClient.getSubscriber().subscribe(id, (subData) => {
        // MessageEmitter.on(id, (message) => {
            const message = JSON.parse(subData);
            console.log('Receiver message from client ', message);
            const clientId = message.client;
            const data = message.message;
            const decryptedMessage = SecretService.decrypt(data, clientId);
            if (decryptedMessage) {
                message.message = `${message.message}::VERIFIED`;
            } else {
                message.message = `${message.message}::UNVERIFIED`;
            }
            res.write(`event: ${clientId}\n`);
            res.write('retry: 10000\n')
            res.write(`data: ${JSON.stringify(message)}\n\n`);
        });
    };
    router.route(`/${VERSION}/messages/`)
      .post(handleMessageCreation);

    router.route(`/${VERSION}/messages/:id`)
      .get(handleGetMessage);
}