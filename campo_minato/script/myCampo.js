class myCampo{
    constructor(numColonne){
        this.colonne = numColonne;
        this.righe = 10;
        this.numeroMine = 10;
        //vettore che contiene le cordinate delle mine
        this.vettMineXY = [];
    }

    //genera coordinate casuali per le mine
    generaXYMine(){
        let r, c, temp;
        //per quante sono le mine da mettere
        for(let i = 0; i <= this.numeroMine; i++){
            c = this.generaRandom(this.colonne);
            r = this.generaRandom(this.righe);
            temp = r + ";" + c;
            //inserisco nel vettore e ripristino temp
            this.vettMineXY[i] = temp;
            temp = "";
        }
    }

    //ricomincia il gioco
    ripristina(){
        location.reload();
    }

    //creo il campo con la grafica
    creaCampoDaGioco(){
        //prima di tutti piazza le bombe
        this.generaXYMine();
        //per tutte le righe
        for(let i = 0; i < this.righe; i++){
            this.addRigaCelle(i);
        }
    }

    //se la cella contiene una mina
    isMina(r, c){
        let vettTempXY = [];
        for(let i = 0; i < this.vettMineXY.length - 1; i++){
            vettTempXY = this.vettMineXY[i].split(';');
            //se le righe combaciano
            if(vettTempXY[0] == r && vettTempXY[1] == c)
                return true;
        }
        return false;
    }

    //genera un numero casale
    generaRandom(max){
        return Math.floor(Math.random() * max);
    }


    //metodo che aggiunge una riga alla volta con il controllo se sono o meno mine
    addRigaCelle(numR){
        for(let c = 0; c < this.colonne; c++){
            //se è una mina
            if(this.isMina(numR, c) == true){
                //prendo il div che deve contenere il campo e ci salvo una mina
                $(document).ready(function(){
                    $("#celle").append("<div class='mina' data-row=" + numR + " data-coloumn=" + c + "></div>");
                });
            }
            else{
                //prendo il div che deve contenere il campo
                $(document).ready(function(){
                    $("#celle").append("<div class='celleChiuse' data-row=" + numR + " data-coloumn=" + c + "></div>");
                });
            }
            
        }
        
    }
}