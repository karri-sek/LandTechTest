import { getLandOwnerTrees } from '../landRegistryDataLoader/dataLoader';
import { isEmpty, findCompany, getAllLandCount } from '../treeUtils/utils';

const getLandCount = async (req, res) => {
    if (isEmpty(req.query.companyID)) {
        return res.status(401).json({ message: 'please provide companyID' });
    }
    const { companyID } = req.query;
    for (const treeNode of getLandOwnerTrees()) {
        const matchedNode = findCompany(treeNode, companyID);
        if (!isEmpty(matchedNode)) return res.json(prepareResponseJson(matchedNode, getAllLandCount(matchedNode)));
    }
};

const prepareResponseJson = (node, count) => ({
    count,
    name: node.name,
    id: node.id,
});
export { getLandCount };
