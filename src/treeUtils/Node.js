class Node{
    constructor(id, name, landParcelId, subCompanies=[]){
        this.name=name;
        this.id = id;
        this.landParcelId = landParcelId
        this.subCompanies = subCompanies;
    }
}

export default Node;