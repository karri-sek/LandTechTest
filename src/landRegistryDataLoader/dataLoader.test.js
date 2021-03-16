import {tagToOwnerNode} from './dataLoader'
import Node from '../treeUtils/Node';


describe('tagToOwnerNode', () => {
    it('given the input line it should tag to his owner tree if exists', () =>{
        const parentNode = new Node('p1','parent', null)
        const childNode = new Node('c1','child', "p1")
        const node = tagToOwnerNode(parentNode, childNode, 'p1')
        expect(node.subCompanies.length).toBe(1)
    })
})