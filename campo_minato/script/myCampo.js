class myCampo {
    constructor(numRighe, numColonne, numMine) {
        this.colonne = numColonne;
        this.righe = numRighe;
        this.numeroMine = numMine;
        this.matriceCelle = [];
        this.mineTrovate = 0;
        this.isGiocoInCorso = true;
        this.bandierine = 0;
        this.aperte = 0;
        this.totCelle = this.righe * this.colonne;
    }

    //genera coordinate casuali per le mine
    generaEPosizionaMine() {
        let c, r;
        //per quante sono le mine da mettere
        for (let i = 0; i < this.numeroMine; i++) {
            c = this.generaRandom(this.colonne);
            r = this.generaRandom(this.righe);
            //se la cella con coordinate r e c è gia una cella si deve rifare
            while (this.matriceCelle[r][c].cellaIsMina == true) {
                c = this.generaRandom(this.colonne);
                r = this.generaRandom(this.righe);
            }
            this.matriceCelle[r][c].cellaIsMina = true;
            //vicino alla mina segno le altre celle adiacenti comprese quelle in obliquo
            //partendo alto a sinistra
            for (let contR = -1; contR <= 1; contR++) {
                for (let contC = -1; contC <= 1; contC++) {
                        let posR = r + contR;
                        let posC = c + contC;
                        //se non si è fuori dal campo
                        if (posR >= 0 && posR < this.righe && posC >= 0 && posC < this.colonne){
                            if(this.matriceCelle[posR][posC].cellaIsMina != null)
                                this.matriceCelle[posR][posC].numMineVicine++;
                        }
                }
            }
        }
    }

    //ricomincia il gioco
    ripristina() {
        location.reload();
    }

    eliminaTuttoHtml(){
        $("#celle").html("");
    }

    //creo il campo con la grafica
    creaCampoDaGioco() {
        //modifico la prima cella dello schermo in alto
        $("#mine").text("mine presenti: " + this.numeroMine);

        //per tutte le righe
        for (let i = 0; i < this.righe; i++) {
            this.matriceCelle[i] = [];
            this.addRigaCelle(i);
        }

        this.generaEPosizionaMine();
    }

    //genera un numero casale
    generaRandom(max) {
        return Math.floor(Math.random() * max);
    }


    //metodo che aggiunge una riga alla volta con il controllo se sono o meno mine
    addRigaCelle(numR) {
        for (let c = 0; c < this.colonne; c++) {
            this.matriceCelle[numR][c] = new myCella();
            //prendo il div che deve contenere il campo e ci salvo una mina
            $("#celle").append("<div class='celleChiuse' data-row=" + numR + " data-coloumn=" + c + "></div>");
        }
    }

    controlloClick(rigaCella, colonnaCella) {
        //se il gioco non è terminato
        if (this.isGiocoInCorso) {

            //se click su cella aperta
            if (this.matriceCelle[rigaCella][colonnaCella].stato == "aperta")
                return 0;

            //se hai preso un mina
            if (this.matriceCelle[rigaCella][colonnaCella].cellaIsMina == true) {
                $('.celleChiuse[data-row=' + rigaCella + '][data-coloumn=' + colonnaCella + ']').addClass("cellaMina");
                $("#feedback").text("hai perso");
                this.isGiocoInCorso = false;
                this.visualizzaTutteMine();
                return 0;
            }

            //altrimenti hai preso una cella normale
            $('.celleChiuse[data-row=' + rigaCella + '][data-coloumn=' + colonnaCella + ']').addClass("cellaBianca");
            if(this.matriceCelle[rigaCella][colonnaCella].numMineVicine != 0)
                $('.celleChiuse[data-row=' + rigaCella + '][data-coloumn=' + colonnaCella + ']').html(this.matriceCelle[rigaCella][colonnaCella].numMineVicine);

            this.matriceCelle[rigaCella][colonnaCella].stato = "aperta";

            this.aperte++;

            //se hai preso una cella vuota
            if (this.matriceCelle[rigaCella][colonnaCella].numMineVicine == 0) {
                $('.celleChiuse[data-row=' + rigaCella + '][data-coloumn=' + colonnaCella + ']').addClass("cellaBianca");
                for(var contR = rigaCella-1; contR <=rigaCella + 1; contR++){
                    for (let contC = colonnaCella-1; contC <= colonnaCella+1; contC++) {
                        if (contR >= 0 && contR < this.righe && contC >= 0 && contC < this.colonne)
                            this.controlloClick(contR, contC);
                    }
                }
            }

            if(this.aperte == this.totCelle - this.numeroMine){
                $("#feedback").text("hai vinto!!");
                this.isGiocoInCorso = false;
            }
        }
        else
            alert("gioco finito");
    }

    visualizzaTutteMine() {
        for (let r = 0; r < this.righe; r++){
            for (let c = 0; c < this.colonne; c++){
                if (this.matriceCelle[r][c].cellaIsMina) {
                    this.matriceCelle[r][c].stato = "aperta";
                    $('.celleChiuse[data-row=' + r + '][data-coloumn=' + c + ']').addClass("cellaMina");
                }
            }
        }
    }

    mettiBandierina(rCella, cCella) {
        if (this.isGiocoInCorso) {
            //se hai preso una cella chiusa 
            if (this.matriceCelle[rCella][cCella].stato == "chiusa"){
                $('.celleChiuse[data-row=' + rCella + '][data-coloumn=' + cCella + ']').addClass("celleBandierina");
                //se hai preso un mina
                if (this.matriceCelle[rCella][cCella].cellaIsMina == true){
                    this.mineTrovate++;
                }
                this.bandierine++;
                this.matriceCelle[rCella][cCella].stato = "flag";
                this.aggiornaNumeroMineNelCampo();
            }

            //se click su una cella con la bandierina torna ad essere una cella chiusa
            else if (this.matriceCelle[rCella][cCella].stato == "flag"){
                $('.celleChiuse[data-row=' + rCella + '][data-coloumn=' + cCella + ']').removeClass("celleBandierina");
                $('.celleChiuse[data-row=' + rCella + '][data-coloumn=' + cCella + ']').addClass("cellaChiusa");
                this.matriceCelle[rCella][cCella].stato = "chiusa";
                //se hai preso un mina
                if (this.matriceCelle[rCella][cCella].cellaIsMina == true){
                    this.mineTrovate--;
                }
                this.bandierine--;
                this.aggiornaNumeroMineNelCampo();
            }

            if(this.mineTrovate == this.numeroMine){
                $("#feedback").text("hai vinto!!");
                this.isGiocoInCorso = false;
            }
                
        }
        else
            alert("gioco finito");
    }

    aggiornaNumeroMineNelCampo(){
        //aggiorna il numero di mine nel campo
        //se il numero di mine è negativo esce un alert
        if(this.numeroMine - this.bandierine < 0){
            alert("hai messo troppe bandierine");
            return 0;
        }
        $("#mine").text("mine presenti: " + (this.numeroMine - this.bandierine));
    }
}