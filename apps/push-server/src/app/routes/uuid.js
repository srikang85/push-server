import { v4 as uuidv4 } from 'uuid';

const allUIDs = [];
module.exports = function(router, VERSION) {
    const handleGetUUID = function (req, res) {
        const uuid = uuidv4();
        allUIDs.push(uuid);
        res.status(200).send({
            uuid: uuidv4()
        }).end();
    };

    const handleAllUUIDs = function(req, res) {
        res.status(200).send({
            uuid: allUIDs
        }).end(); 
    }
    router.route(`/${VERSION}/uuid/`)
      .get(handleGetUUID);
    router.route(`/${VERSION}/allIds/`)
      .get(handleAllUUIDs);
}