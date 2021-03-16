import { getOwnerLandMap } from '../landRegistryDataLoader/dataLoader';

const isEmpty = (value) => value === 'null' || value === null || value === undefined || value === '';

const getAllLandCount = (node) => {
    let result = 0;
    if (node === null) return;
    else {
        result += getOwnerLandMap().get(node.id)?getOwnerLandMap().get(node.id).length:0;
        node.subCompanies.forEach((childNode) => (result += getAllLandCount(childNode)));
    }
    return result;
};

const findCompany = (node, companyID) => {
    if (node === null) return;
    if (node.id === companyID) return node;
    else if(node.subCompanies.length !==0){
        for (const childNode of node.subCompanies) {
            const matchedNode = findCompany(childNode, companyID);
            if (matchedNode) {
                return matchedNode;
            }
        }
      }
      return ;
};
export { isEmpty, findCompany, getAllLandCount };
