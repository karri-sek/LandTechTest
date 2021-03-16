import {findCompany, getAllLandCount} from './utils'
import Node from './Node';
import * as dataLoader  from '../landRegistryDataLoader/dataLoader';

describe('Tree Utils test utility methods', () => {
    describe('findCompany() tests', () => {
        test('findCompany should return a matched node if there is a match on company ID', async ()=>{
            const node = new Node("C2013","Acme Land Ltd",null)
            const matchedNode = findCompany(node, "C2013");
            expect(matchedNode).toBeDefined();
            expect(matchedNode.id).toBe("C2013");
        })
    
        test('given Node has two child nodes it should it return matched if the input companyID is one of it\'s child', async ()=>{
            const child1 = new Node("C71299","child1","C2013")
            const child2 = new Node("C4012","child2","C71299")
            const parentNode = new Node("C2013","Acme Land Ltd",null,[child1, child2])
            const matchedNode = findCompany(parentNode, "C71299");
            expect(matchedNode).toBeDefined();
            expect(matchedNode.id).toBe("C71299");
        })
    
        test('if the given companyID does not exists under given tree either as child or parent should return undefined', async ()=>{
            const child1 = new Node("C71299","child1","C2013")
            const child2 = new Node("C4012","child2","C71299")
            const parentNode = new Node("C2013","Acme Land Ltd",null,[child1, child2])
            const matchedNode = findCompany(parentNode, "C4549");
            expect(matchedNode).toBeUndefined();
        })
    })
    describe('getAllLandCount() tests', () => {
        test('should return count of lands owned by the input company', async ()=>{
            const mapOfLands = new Map();
            mapOfLands.set('C2013',["T453", "T451"]);
            dataLoader.getOwnerLandMap = jest.fn(()=>mapOfLands);
            const node = new Node("C2013","Acme Land Ltd",null)
            const count = getAllLandCount(node);
            expect(count).toBe(2);
        })
        test('if the given company has sub companies who owns multiple lands, then the return count should be sum of all lands', async ()=>{
            dataLoader.getOwnerLandMap = jest.fn(()=>mapOfLands);
            const mapOfLands = new Map();
            mapOfLands.set('C2013',["T453", "T451"]);
            mapOfLands.set('C4012',["T463", "T455"]);
            mapOfLands.set('C71299',["T473", "T454"]);
            const child1 = new Node("C71299","child1","C2013")
            const child2 = new Node("C4012","child2","C2013")
            const node = new Node("C2013","Acme Land Ltd",null, [child1, child2])
            const count = getAllLandCount(node);
            expect(count).toBe(6);
        })
        test('if the given company has sub companies and one sub company does not have lands it should not count ', async ()=>{
            dataLoader.getOwnerLandMap = jest.fn(()=>mapOfLands);
            const mapOfLands = new Map();
            mapOfLands.set('C2013',["T453", "T451"]);
            mapOfLands.set('C4012',["T463", "T455"]);
            mapOfLands.set('C71299',[]);
            const child1 = new Node("C71299","child1","C2013")
            const child2 = new Node("C4012","child2","C2013")
            const node = new Node("C2013","Acme Land Ltd",null, [child1, child2])
            const count = getAllLandCount(node);
            expect(count).toBe(4);
        })
        test('should return zero if the company does not own any', async ()=>{
            const mapOfLands = new Map();
            mapOfLands.set('C2013',[]);
            dataLoader.getOwnerLandMap = jest.fn(()=>mapOfLands);
            const node = new Node("C2013","Acme Land Ltd",null)
            const count = getAllLandCount(node);
            expect(count).toBe(0);
        })
    })
    
})


