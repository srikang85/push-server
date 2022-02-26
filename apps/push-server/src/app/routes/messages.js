import { setSSEHeader } from './SSEUtil';

module.exports = function(router, VERSION) {

    
    const handleMessageCreation = function (req, res) {
        console.log('Received message');
      res.status(200).send({
          success: true,
          message: 'User successfully authenticated'
      }).end();
    };

    const handleGetMessage = function (req, res) {
        const data = {
            success: true,
            message: 'User successfully authenticated'
        };
        setSSEHeader(res);
        res.write('id: UniqueId\n');
        res.write(`data: ${data}\n\n`);
    };
    router.route(`/${VERSION}/messages/`)
      .get(handleGetMessage)
      .post(handleMessageCreation);
}