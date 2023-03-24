function calcolaBolloVeicolo() {
    let v = document.bolloVeicolo.tipo.value;
    let cv = document.bolloVeicolo.cilindrata.value;
    let classeInq = document.bolloVeicolo.classe.value;
    
    //controllo input
    if(v == "" || cv == "" || classeInq == ""){
        alert("compila tutti i campi");
        document.getElementById("demo").innerHTML = "";
        document.getElementById("insImg").innerHTML = "";
    }
    else if(v == "null" || cv < 1 || classeInq == "null"){
        alert("compila correttamente tutti i campi");
        document.getElementById("demo").innerHTML = "";
        document.getElementById("insImg").innerHTML = "";
    }
    else{
        let textImg = "";
        let text = "";
        let costoAlCV = "";
        let costoBollo = "";
        
        
        //in base al tipo
        if(v == "moto"){
            costoAlCV = 3.3;
            text = "Bollo moto con " + cv + " cavalli e di " + classeInq + " ";
            textImg = "<img src=\"images/moto.jpg\"></img>";
        }
        else{
            costoAlCV = 4.5;
            text = "Bollo auto con " + cv + " cavalli e di " + classeInq + " ";
            textImg = "<img src=\"images/auto.jpg\"></img>";
        }
        

        //in base alla classe di inquinamento aggiungere o meno un aumento
        costoBollo = cv * costoAlCV;
        if(classeInq == "E0" || classeInq == "E1" || classeInq == "E2" || classeInq == "E3"){
            let incremento = costoBollo * 30 / 100;
            costoBollo += incremento;
        }

        text += " = " + costoBollo;
        
        document.getElementById("demo").innerHTML = text;
        document.getElementById("insImg").innerHTML = textImg;
    }
    return false;
}