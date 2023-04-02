class CSlot{
    //costrutture
    constructor(){
        this.vettoreImg = new Array("images/zero.png", "images/uno.png", "images/due.png", "images/tre.png", "images/quattro.png", "images/cinque.png", "images/sei.png", "images/sette.png", "images/otto.png", "images/nove.png");
        this.creditiRimasti = 10;
        this.vincita = 0;
        this.vettoreNum = new Array(null, null, null);
    }
    //funzione che fa girare la slot
    spin(){
        if(this.creditiRimasti == 0){
            alert("crediti finiti");
        }
        else{
            let num = null;
            let img = document.getElementsByTagName("img");
            this.creditiRimasti -= 1;
            this.modificaCreditiDisponibili();
            
            //per il numero delle casselle della slot
            for(let i = 0; i < this.vettoreNum.length; i++){
                num = Math.round(Math.random() * 9);
                //memorizza il numero dell'immagine nel vettore
                this.vettoreNum[i] = num;
                //scelta dell'immagine
                img[i].src = this.vettoreImg[num];
                //alert(num);
            }
    
            this.controlloVittoria();
            this.modificaCreditiDisponibili();

            if(this.creditiRimasti == 0){
                alert("crediti finiti");
            }
        }
    }

    modificaCreditiDisponibili(){
        document.getElementById("display").innerHTML = "CREDITI DISPONIBILI: " + this.creditiRimasti + " cr";
    }

    controlloVittoria(){
        let celleUguali = 0;
        let isConsecutive = false;


        //controllo coppie
        //primo e secondo
        if(this.vettoreNum[0] == this.vettoreNum[1]){
            this.vincita = 20 * (this.vettoreNum[0] + 1);
        }
        //secondo e terzo
        else if(this.vettoreNum[1] == this.vettoreNum[2]){
            this.vincita = 20 * (this.vettoreNum[1] + 1);
        }
        //primo e terzo
        else if(this.vettoreNum[0] == this.vettoreNum[3]){
            this.vincita = 5 * (this.vettoreNum[0] + 1);
        }

        //controllo tris
        for (let i = 0; i < this.vettoreNum.length-1; i++) {
            if(this.vettoreNum[i] == this.vettoreNum[i+1]){
                celleUguali++;
            }
        }
        if(celleUguali == 2){
            this.vincita = 50 * (this.vettoreNum[0] + 1);
        }
        
        this.creditiRimasti += this.vincita;
        this.vincita = 0;
    }

    incassa(){
        alert("INCASSATI: " + this.creditiRimasti + " crediti");
        this.creditiRimasti = 10;
        this.vincita = 0;
        this.modificaCreditiDisponibili();

        let vettoreTagImg = document.getElementsByTagName("img");
        for(let i = 0; i < this.vettoreNum.length; i++){
            vettoreTagImg[i].src = "images/invisibile.png";
        }
    }
}