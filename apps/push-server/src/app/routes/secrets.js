import { SecretService } from '../serices/secretService';
import { setSSEHeader } from './SSEUtil';

module.exports = function(router, VERSION) {
    const handleGetSecret = function (req, res) {
        res.status(200).send({
            secret: SecretService.getPublicKey()
        }).end();
    };
    router.route(`/${VERSION}/secrets/`)
      .get(handleGetSecret)
}