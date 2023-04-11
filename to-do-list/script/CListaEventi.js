class CListaEventi {
    constructor() {
        this.listaAttivita = new Array();
        this.numEl = 0;
    }

    //aggiunge attivita
    aggiungiEvento() {
        //prendo data e nome attivita
        let d = document.getElementById("data").value;
        let nAttivita = document.getElementById("attivita").value;
        //controllo che non siano vuoti
        if (d == "" || nAttivita == "") {
            alert("inserire data e/o descrizione dell'evento");
            return false;
        }
        else {
            //controllo che la data non sia gia passta
            let dataAttivita = new Date(d);
            let giornoAttuale = new Date();
            if ((dataAttivita.getTime() - giornoAttuale.getTime()) <= 0) {
                alert("data già passata, selezionare un altro giorno")
                return false;
            }
            else {

                //oggetto evento
                let evento = new CEvento(dataAttivita, nAttivita);
                //aggiungi in fondo e incremento numero di elementi e poi ordina per tempo di scandenza 
                this.listaAttivita.push(evento);
                this.numEl++;
                this.ordinamentoData();
                //vettore di check box
                let vettBox = document.getElementsByClassName("box");
                //lo aggiungo alla tabella (uso la stessa idea che si fa per i file quando si deve riscrivere da capo)
                for (let i = 0; i < this.numEl; i++) {
                    //passo il nome e la posizione
                    this.addNuovaRiga(this.listaAttivita[i].attivita, i);
                    //controllo altre scelte    
                    if (this.listaAttivita[i].isCompletata == true) {
                        //prendi l'elemento checkbox e modifica lo stato

                        vettBox[i].checked = true;
                        //prendi e modifica il testo
                        let vettNomeAttivita = document.getElementsByClassName("nomeAttivita");
                        vettNomeAttivita[i].style.textDecoration = "line-through";
                    }
                }
                //pulisco la textbox
                document.getElementById("attivita").value = "";
            }
        }
    }

    //inserimento nuova riga
    addNuovaRiga(nome, pos) {
        //prendi la tabella e ci aggiungi in fondo
        let tabellaEventi = document.getElementsByTagName("table")[0];
        //elemento con il nome dell'attivita   elemento con il bottone elimina
        tabellaEventi.innerHTML += "<tr><td class = 'tdEvento'><input type='checkbox' class='box' onchange='lista.modificaStatoAttivita(" + pos + ")'></td><td class='nomeAttivita'>" + nome + "</td><td><button onclick='lista.eliminaSingolo(" + pos + ")'>canc</button></td></tr>";
    }



    eliminaTableHTML() {
        //prendi la tabella e ci aggiungi in fondo
        let tabellaEventi = document.getElementsByTagName("table");
        tabellaEventi[0].innerHTML = "";
        //ma l'intestazione rimane
        tabellaEventi[0].innerHTML = "<tr><th>Stato</th><th>Nome attività</th><th>Elimina</th></tr>";
    }

    //cancella l'intera lista/table
    eliminaTutto() {
        for (let i = 0; i < this.numEl; i++) {
            //tiro fuori un elemento alla volta
            this.listaAttivita.pop();
        }
        //azzero il numero elementi
        this.numEl = 0;
        this.eliminaTableHTML();
    }

    //cancella un singolo evento
    eliminaSingolo(posEvento) {
        //a partire dall'indice posEvento cancella un elemento
        this.listaAttivita.splice(posEvento, 1);
        //decremento numero di elementi
        this.numEl--;
        //elimino la tabela nell'HTML e riscrivo tutto (stessa logica dei file)
        this.eliminaTableHTML();
        //vettore di check box
        let vettBox = document.getElementsByClassName("box");
        for (let i = 0; i < this.numEl; i++) {
            this.addNuovaRiga(this.listaAttivita[i].attivita, i);
            //se è gia stato completata
            if (this.listaAttivita[i].isCompletata == true) {
                //modifica lo stato
                vettBox[i].checked = true;
                //prendi e modifica il testo
                let vettNomeAttivita = document.getElementsByClassName("nomeAttivita");
                vettNomeAttivita[i].style.textDecoration = "line-through";
            }
        }
    }

    //modifica lo stato dell'evento --> completato o non completato
    modificaStatoAttivita(i) {
        this.listaAttivita[i].modificaStato();

        let vettNomeAttivita = document.getElementsByClassName("nomeAttivita");

        if (this.listaAttivita[i].isCompletata == true) {
            vettNomeAttivita[i].style.textDecoration = "line-through";
        }
        else {
            vettNomeAttivita[i].style.textDecoration = "none";
        }
    }

    //ordimanento
    ordinamentoData() {
        //bubble sort
        for (let i = 0; i < this.numEl; i++) {
            for (let c = 0; c < (this.numEl - 1); c++) {
                if (this.listaAttivita[c].dataAttivita > this.listaAttivita[c + 1].dataAttivita) {
                    let eventoTmp = this.listaAttivita[c];
                    this.listaAttivita[c] = this.listaAttivita[c + 1];
                    this.listaAttivita[c + 1] = eventoTmp;
                }
            }
        }
        this.eliminaTableHTML();

    }

    //visualizza le attivita per stato, prima quelle da completare poi quelle restanti
    /*ordinaPerStato() {
        if (this.numEl > 1) {
            //prima le ordino per data
            this.ordinamentoData();
            //poi le scorro tutte e quelle completate finiscono in fondo
            for (let i = 0; i < this.numEl; i++) {
                if (this.listaAttivita[i].isCompletata == true) {
                    let eventoRimosso = this.listaAttivita[i];
                    delete this.listaAttivita[i];
                    alert(eventoRimosso.attivita);
                    this.listaAttivita.push(eventoRimosso);
                }
            }
            //cancello la grafica
            this.eliminaTableHTML();
            //riscrivo
            //vettore di check box
            let vettBox = document.getElementsByClassName("box");
            //lo aggiungo alla tabella (uso la stessa idea che si fa per i file quando si deve riscrivere da capo)
            for (let i = 0; i < this.numEl; i++) {
                //passo il nome e la posizione
                this.addNuovaRiga(this.listaAttivita[i].attivita, i);
                //controllo altre scelte    
                if (this.listaAttivita[i].isCompletata == true) {
                    //prendi l'elemento checkbox e modifica lo stato
                    vettBox[i].checked = true;
                    //prendi e modifica il testo
                    let vettNomeAttivita = document.getElementsByClassName("nomeAttivita");
                    vettNomeAttivita[i].style.textDecoration = "line-through";
                }
            }
        }
    }*/

    //mostra nella tabella solo le attività urgenti
    mostraUrgenti() {
        let boxUrgente = document.getElementById("urgente");
        if (boxUrgente.checked == true) {
            //elimino la tabela nell'HTML e riscrivo tutto (stessa logica dei file)
            this.eliminaTableHTML();
            //vettore di check box
            let vettBox = document.getElementsByClassName("box");
            for (let i = 0; i < this.numEl; i++) {
                //controllo che mancano meno di tre giorni alla scadenza
                let dataAttivita = new Date(this.listaAttivita[i].dataAttivita);
                let giornoAttuale = new Date();
                //se le due date distano di meno di 3 giorni (espresso in millisecondi)
                if ((dataAttivita.getTime() - giornoAttuale.getTime()) <= 86400000 * 3) {
                    this.addNuovaRiga(this.listaAttivita[i].attivita, i, this.listaAttivita[i].stato);
                    //se è gia stato completata
                    if (this.listaAttivita[i].isCompletata == true) {
                        //modifica lo stato
                        vettBox[i].checked = true;
                        //prendi e modifica il testo
                        let vettNomeAttivita = document.getElementsByClassName("nomeAttivita");
                        vettNomeAttivita[i].style.textDecoration = "line-through";
                    }
                }

            }
        }
        //se si visualizzano tutti
        else {
            //elimino la tabela nell'HTML e riscrivo tutto (stessa logica dei file)
            this.eliminaTableHTML();
            //vettore di check box
            let vettBox = document.getElementsByClassName("box");
            //lo aggiungo alla tabella (uso la stessa idea che si fa per i file quando si deve riscrivere da capo)
            for (let i = 0; i < this.numEl; i++) {
                //passo il nome e la posizione
                this.addNuovaRiga(this.listaAttivita[i].attivita, i);
                //controllo altre scelte    
                if (this.listaAttivita[i].isCompletata == true) {
                    //prendi l'elemento checkbox e modifica lo stato
                    vettBox[i].checked = true;
                    //prendi e modifica il testo
                    let vettNomeAttivita = document.getElementsByClassName("nomeAttivita");
                    vettNomeAttivita[i].style.textDecoration = "line-through";
                }
            }
        }
    }
}
