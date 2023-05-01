class myCampo {
    constructor(numColonne, numMine) {
        this.colonne = numColonne;
        this.righe = 10;
        this.numeroMine = numMine;
        this.matriceCelle = [];
        this.mineTrovate = 0;
        this.isGiocoInCorso = true;
    }

    //genera coordinate casuali per le mine
    generaEPosizionaMine() {
        let c, r;
        //per quante sono le mine da mettere
        for (let i = 0; i <= this.numeroMine; i++) {
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
                    if (posR >= 0 && posR < this.righe && posC >= 0 && posC < this.colonne)
                        this.matriceCelle[posR][posC].numMineVicine++;
                }
            }
        }
    }

    //ricomincia il gioco
    ripristina() {
        location.reload();
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
                alert("hai perso");
                this.isGiocoInCorso = false;
                this.visualizzaTutteMine();
                return 0;
            }
            //se non è una mina può essere due cose
            else {
                //o bianca
                if (this.matriceCelle[rigaCella][colonnaCella].numMineVicine == 0) {
                    $('.celleChiuse[data-row=' + rigaCella + '][data-coloumn=' + colonnaCella + ']').addClass("cellaBianca");
                    for(var contR = rigaCella-1; contR <=rigaCella + 1; contR++){
                        for (let contC = colonnaCella-1; contC <= colonnaCella+1; contC++) {
                            if (contR >= 0 && contR < this.righe && contC >= 0 && contC < this.colonne)
                                this.controlloClick(contR, contC);
                        }
                    }
                }
                //o una vicina ad una cella
                else {
                    $('.celleChiuse[data-row=' + rigaCella + '][data-coloumn=' + colonnaCella + ']').addClass("cellaBianca");
                    $('.celleChiuse[data-row=' + rigaCella + '][data-coloumn=' + colonnaCella + ']').html(this.matriceCelle[rigaCella][colonnaCella].numMineVicine);
                    for(var contR = rigaCella-1; contR <=rigaCella + 1; contR++){
                        for (let contC = colonnaCella-1; contC <= colonnaCella+1; contC++) {
                            if (contR >= 0 && contR < this.righe && contC >= 0 && contC < this.colonne)
                                this.controlloClick(contR, contC);
                        }
                    }
                }
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

    mettiBandierina(cellaClick) {
        if (this.isGiocoInCorso) {
            //nel caso di cella già aperta
            if (cellaClick.getAttribute("class") == "celleAperte")
                return 0;

            //se cella con la bandierina
            else if (cellaClick.getAttribute("class") == "celleBandierina") {
                $(cellaClick).removeClass("celleBandierina");
                $(cellaClick).addClass("celleChiuse");
            }

            //se cella chiusa
            else {
                //cambio classe
                $(document).ready(function () {
                    $(cellaClick).removeClass("celleChiuse");
                    $(cellaClick).addClass("celleBandierina");
                });
            }
        }
        else
            alert("gioco finito");
    }
}