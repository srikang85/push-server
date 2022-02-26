import { setSSEHeader } from './SSEUtil';
import { MessageEmitter } from './../serices/messageService';
import { ESRCH } from 'constants';
import { SecretService } from './../serices/secretService';
module.exports = function(router, VERSION) {
  
    const handleMessageCreation = function (req, res) {      
      const message = req.body;
      MessageEmitter.emit('newMessage', message?.data);
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
        setSSEHeader(res);
        MessageEmitter.on('newMessage', (message) => {
            //console.log('Receiver message from client ', typeof message);
            const clientId = message.client;
            const data = message.message;
            const decryptedMessage = SecretService.decrypt(data, clientId);
            console.log(decryptedMessage);
            res.write(`event: ${clientId}\n`);
            res.write('retry: 10000\n')
            res.write(`data: ${JSON.stringify(message)}\n\n`);
        });
    };
    router.route(`/${VERSION}/messages/`)
      .get(handleGetMessage)
      .post(handleMessageCreation);
}