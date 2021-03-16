import fs from 'fs';
import path from 'path';
import Node from '../treeUtils/Node';
import {isEmpty} from '../treeUtils/utils';

const ownershipLandMap = new Map();
const landOwnerTrees = [];

const createLandOwnersTreesFromCSV = (companyRelationsFilePath) => {
    fs.readFileSync(path.resolve(__dirname, companyRelationsFilePath), 'utf8')
        .split('\n')
        .slice(1) // header row
        .forEach((line) => {
            const [id, name, parentId] = line.split(',');
            const companyNode = new Node(id, name, getOwnerLandMap().get(id));
            if(isEmpty(parentId)){
                getLandOwnerTrees().push(companyNode)
           }else{
                getLandOwnerTrees().map(ownerNode => tagToOwnerNode(ownerNode, companyNode, parentId))
           }
    });
};

const tagToOwnerNode = (ownerNode, companyNode, parentId) => {
    if (ownerNode.id === parentId) {
        ownerNode.subCompanies.push(companyNode);
        return ownerNode;
    } else if (ownerNode.subCompanies.length !== 0) {
            ownerNode.subCompanies.forEach(child => tagToOwnerNode(child, companyNode, parentId));
    }
};

const createMapOwnershipLand = (landOwnerFilePath) => {
    fs.readFileSync(path.resolve(__dirname, landOwnerFilePath), 'utf8')
        .split('\n')
        .slice(1) // header row
        .forEach((line) => {
            const [landId, companyId] = line.split(',');
            ownershipLandMap.has(companyId)
                ? ownershipLandMap.set(companyId, ownershipLandMap.get(companyId).concat(landId))
                : ownershipLandMap.set(companyId, [landId]);
        });
};

const loadData = (landOwnerFilePath, companyRelationsFilePath) => {
    createMapOwnershipLand(landOwnerFilePath);
    createLandOwnersTreesFromCSV(companyRelationsFilePath);
};

const getLandOwnerTrees = () => landOwnerTrees;
const getOwnerLandMap = () => ownershipLandMap;



export { loadData, getLandOwnerTrees, getOwnerLandMap, tagToOwnerNode  };
