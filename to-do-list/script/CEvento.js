class CEvento{
    constructor(data, nomeAttivita){
        this.dataAttivita = data;
        this.attivita = nomeAttivita;
        this.isCompletata = false;
    }
    
    modificaStato(){
        this.isCompletata = !this.isCompletata;
    }
}