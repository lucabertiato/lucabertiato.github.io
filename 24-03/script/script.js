function modificaGalleria(){
    let scelta = document.campo.opzione.value;
    let img1 = "";
    let img2 = "";
    let img3 = "";
    let img4 = "";
    let desc1 = "";
    let desc2 = "";
    let desc3 = "";
    let desc4 = "";

    switch(scelta){
        case "pizza":
            img1 = "images/pizza1.jpg"; 
            img2 = "images/pizza2.jpg"; 
            img3 = "images/pizza3.jpg";
            img4 = "images/pizza4.jpg";
            desc1 = "pizza margherita";
            desc2 = "pizza in pala";
            desc3 = "pizzette di sfoglia";
            desc4 = "pizza bianca";
            break;
        case "verdura":
            img1 = "images/verdura1.jpg"; 
            img2 = "images/verdura2.jpg"; 
            img3 = "images/verdura3.jpg";
            img4 = "images/verdura4.jpg";
            desc1 = desc2 = desc3 = desc4 = "verdura";
            break;
        case "hamburger":
            img1 = "images/hamburger1.jpg"; 
            img2 = "images/hamburger2.jpg"; 
            img3 = "images/hamburger3.jpg";
            img4 = "images/hamburger4.jpg";
            desc1 = "classico";
            desc2 = "vegetariano";
            desc3 = "hamburger di pollo";
            desc4 = "classico";
            break;
        case "null":
            img1 = img2 = img3  = img4 = "images/standard.jpg";
            desc1 = desc2 = desc3 = desc4 = "standard";
            break;
    }
    document.getElementById("prima").src = img1;
    document.getElementById("seconda").src = img2;
    document.getElementById("terza").src = img3;
    document.getElementById("quarta").src = img4;
    document.getElementById("primoHREF").href = img1;
    document.getElementById("secondoHREF").href = img2;
    document.getElementById("terzoHREF").href = img3;
    document.getElementById("quartoHREF").href = img4;
    document.getElementById("descrizione1").innerHTML = desc1;
    document.getElementById("descrizione2").innerHTML = desc2;
    document.getElementById("descrizione3").innerHTML = desc3;
    document.getElementById("descrizione4").innerHTML = desc4;
}