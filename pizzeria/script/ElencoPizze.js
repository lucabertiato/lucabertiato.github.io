class ElencoPizze {
    constructor() {
        this.margherita = 0;
        this.prosciutto = 0;
        this.patatine = 0;
        this.wurstel = 0;
        this.rucola = 0;
        this.salamePiccante = 0;
    }

    ricarica() {
        location.reload();
    }

    addPizza(nomePizza) {
        //controllo la pizza da aggiungere
        switch (nomePizza) {
            //PIZZA MARGHERITA
            case "margherita":
                //se è la prima ordinazione
                this.margherita++;
                if (this.margherita == 1) {
                    $("#elenco").append("<div class='lista-item' >margherita</div><div class='lista-item' id='numM'>" + this.margherita + "</div>");
                }
                else {
                    $("#numM").text(this.margherita);
                }
                
                break;

            //PIZZA PROSCIUTTO
            case "prosciutto":
                //se è la prima ordinazione
                this.prosciutto++;
                if (this.prosciutto == 1) {
                    $("#elenco").append("<div class='lista-item' >prosciutto</div><div class='lista-item' id='numPr'>" + this.prosciutto + "</div>");
                }
                else {
                    $("#numPr").text(this.prosciutto);
                }
                
                break;

            //PIZZA RUCOLA
            case "rucola":
                //se è la prima ordinazione
                this.rucola++;
                if (this.rucola == 1) {
                    $("#elenco").append("<div class='lista-item' >rucola</div><div class='lista-item' id='numR'>" + this.rucola + "</div>");
                }
                else {
                    $("#numR").text(this.rucola);
                }
                
                break;
            
            //PIZZA PATATINE
            case "patatine":
                this.patatine++;
                //se è la prima ordinazione
                if (this.patatine == 1) {
                    $("#elenco").append("<div class='lista-item' >patatine</div><div class='lista-item' id='numP'>" + this.patatine + "</div>");
                }
                else {
                    $("#numP").text(this.patatine);
                }
                
                break;
            
            //PIZZA SALAME PICCANTE
            case "salame piccante":
                //se è la prima ordinazione
                this.salamePiccante++;
                if (this.salamePiccante == 1) {
                    $("#elenco").append("<div class='lista-item' >salame piccante</div><div class='lista-item' id='numS'>" + this.salamePiccante + "</div>");
                }
                else {
                    $("#numS").text(this.salamePiccante);
                }
                
                break;
            
            //PIZZA WURSTEL
            case "wurstel":
                //se è la prima ordinazione
                this.wurstel++;
                if (this.wurstel == 1) {
                    $("#elenco").append("<div class='lista-item' >wurstel</div><div class='lista-item' id='numW'>" + this.wurstel + "</div>");
                }
                else {
                    $("#numW").text(this.wurstel);
                }
                
                break;
        }
    }
}