function calcolaArea() {
    let mis = document.poligoni.misura.value;
    let num = document.poligoni.lati.value;

    if(mis == "" || num == ""){
        alert("compila tutti i campi");
    }
    else if(mis < 1 || num < 3 || num > 7){
        alert("compila correttamente tutti i campi");
    }
    else{
        let nomePoligono = "";
        let area = "";
        let apotema = "";
        if(num == 3){
            nomePoligono = "triangolo";
            apotema = 0.289 * parseInt(num);
            area = parseInt(mis) * parseInt(num) * parseFloat(apotema) / 2;
            alert(area);
        }
        else if(num == 4){
            nomePoligono = "quadrato";
            apotema = 0.5 * parseInt(num);
            area = parseInt(mis) * parseInt(num) * parseFloat(apotema) / 2;
        }
        else if(num == 5){
            nomePoligono = "pentagono";
            apotema = 0.668 * parseInt(num);
            area = parseInt(mis) * parseInt(num) * parseFloat(apotema) / 2;
        }
        else if(num == 6){
            nomePoligono = "esagono";
            apotema = 0.886 * parseInt(num);
            area = parseInt(mis) * parseInt(num) * parseFloat(apotema) / 2;
        }
        else{
            nomePoligono = "ettagono";
            apotema = 1.038 * parseInt(num);
            area = parseInt(mis) * parseInt(num) * parseFloat(apotema) / 2;
        }

        document.getElementById("demo").innerHTML = "l'area del "+ nomePoligono + " misura " + area;
    }
    return false;
}