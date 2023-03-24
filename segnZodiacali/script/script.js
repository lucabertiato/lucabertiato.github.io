function trovaSegno() {
    let img = new Image();
    //salvo in d la data trovata
    let c = document.segni.data.value;

    //se non è stata selezionata nessuna data
    if(c == ""){
        alert("scegli una data ");
    }
    else{
        //splitta c e crea l'oggetto d
        c = c.split("-");
        const d = new Date(c[0], c[1], c[2]);
        //prendi il giorno e il mese
        let m = d.getMonth();
        let g = d.getDate();
        let text;
        //controlli per sabilire il segno
        //capricorno
        if((m == 1 && g <= 19) || (m == 0 && g >= 22)){
            text = "<img src=\"images/capricorno.jpg\"></img>";
            document.getElementById("demo").innerHTML = text;
        }
        //aquario
        else if((m == 1 && g >= 20) || (m == 2 && g < 20)){
            text = "<img src=\"images/acquario.jpg\"></img>";
            document.getElementById("demo").innerHTML = text;
        }
        //pesci
        else if((m == 2 && g >= 20) || (m == 32 && g < 21)){
            text = "<img src=\"images/pesci.jpg\"></img>";
            document.getElementById("demo").innerHTML = text;
        }
        //ariete
        else if((m == 3 && g >= 21) || (m == 4 && g < 20)){
            text = "<img src=\"images/ariete.jpg\"></img>";
            document.getElementById("demo").innerHTML = text;
        }
        //toro
        else if((m == 4 && g >= 20) || (m == 5 && g < 21)){
            text = "<img src=\"images/toro.jpg\"></img>";
            document.getElementById("demo").innerHTML = text;
        }
        //gemelli
        else if((m == 5 && g >= 21) || (m == 6 && g < 21)){
            text = "<img src=\"images/gemelli.jpg\"></img>";
            document.getElementById("demo").innerHTML = text;
        }
        //cancro
        else if((m == 6 && g >= 21) || (m == 7 && g < 23)){
            text = "<img src=\"images/cancro.jpg\"></img>";
            document.getElementById("demo").innerHTML = text;
        }
        //leone
        else if((m == 7 && g >= 23) || (m == 8 && g < 24)){
            text = "<img src=\"images/leone.jpg\"></img>";
            document.getElementById("demo").innerHTML = text;
        }
        //vergine
        else if((m == 8 && g >= 24) || (m == 9 && g < 23)){
            text = "<img src=\"images/vergine.jpg\"></img>";
            document.getElementById("demo").innerHTML = text;
        }
        //bilancia
        else if((m == 9 && g >= 23) || (m == 10 && g < 23)){
            text = "<img src=\"images/bilancia.jpg\"></img>";
            document.getElementById("demo").innerHTML = text;
        }
        //scorpione
        else if((m == 10 && g >= 23) || (m == 11 && g < 22)){
            text = "<img src=\"images/scorpione.jpg\"></img>";
            document.getElementById("demo").innerHTML = text;
        }
        //sagittario
        else{
            text = "<img src=\"images/sagittario.jpg\"></img>";
            document.getElementById("demo").innerHTML = text;
        }
    }
    return false;
}