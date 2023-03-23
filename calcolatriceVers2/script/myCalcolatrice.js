class CCalcolatrice{
    constructor(){
        this.parziale = null;
        this.corrente = null;
        this.operazione = null;
        this.isMeno = false;
    }

    addChar(car) {
        let temp = document.getElementById("display").innerHTML;
    
        //se si ha premuto il tasto cancella solo un carattere
        if (car == 'c') {
            let aggiornato = temp.slice(0, -1)
            document.getElementById("display").innerHTML = aggiornato;
            this.corrente = aggiornato;
        }
    
        //se si ha premuto il tasto cancella tutto
        else if (car == 'ce'){
            document.getElementById("display").innerHTML = "";
            this.parziale = null;
            this.corrente = null;
            this.operazione = null;
        }

        //se si mette come primo numero il . ci metto lo 0 davanti
        else if(temp == "" && car == "."){
            document.getElementById("display").innerHTML = "0.";
            this.parziale = "0.";
        }

        //in questo caso o è un numero o è un punto
        else{
            document.getElementById("display").innerHTML = temp + car;
            this.corrente = document.getElementById("display").innerHTML;
        }
    }

    scegliOperazione(op){
        this.parziale = document.getElementById("display").innerHTML;
        this.operazione = op;
        document.getElementById("display").innerHTML = "";
        this.corrente = null;
    }

    calcola(){
        this.corrente = document.getElementById("display").innerHTML;
        if(this.corrente == "" || this.operazione == "" || this.parziale == "")
            alert("impossibile eseguire il calcolo");
        else if(this.corrente == null || this.operazione == null || this.parziale == null)
            alert("impossibile eseguire il calcolo");
        else{
            let risultato = "";
            //addizione
            if (this.operazione == '+')
                risultato = parseFloat(this.parziale) + parseFloat(this.corrente);
            //sottrazione
            else if (this.operazione == "-")
                risultato = this.parziale - this.corrente;
            //divisione
            else if (this.operazione == "/")
                risultato = this.parziale / this.corrente;
            //moltiplicazione
            else if (this.operazione == "*")
                risultato = this.parziale * this.corrente;
            
            document.getElementById("display").innerHTML = risultato;
            this.parziale = risultato;
        }
    }

    segnoNegativo(){
        if(this.isMeno == false){
            let temp = document.getElementById("display").innerHTML;
            if(temp == 0 || temp == "")
                alert("impossibile mettere il segno meno");
            else{
                temp = "-" + temp;
                document.getElementById("display").innerHTML = temp;
                this.corrente = temp;
                this.isMeno = true;
            }
        }
        else{
            let temp = document.getElementById("display").innerHTML;
            temp = temp.substring(1);
            document.getElementById("display").innerHTML = temp;
            this.corrente = temp;
            this.isMeno = false;
        }
        
    }
}
