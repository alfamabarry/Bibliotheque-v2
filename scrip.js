var selectedRow = null
var data13 = document.getElementById('data13')
function onFormSubmit() {
    
        var formData = readFormData();
        if (selectedRow == null)
        {
            insertNewRecord(formData)
            sortTable()

       
 


    
        }
 
                
        else{
            updateRecord(formData);
   
             localStorage.setItem('data13', JSON.stringify(formData)); 
            let storageProfileString = localStorage.getItem("data13");
            console.log("String saved in LocalStorage", storageProfileString);
            let savedPerson = JSON.parse(storageProfileString);
            console.log("Person object:", savedPerson);
            console.log("Person's name:", savedPerson.titre);
      
        }

        resetForm();
    
} 
 
const titre = document.getElementById("titre")
const auteur = document.getElementById('auteur')
const prix = document.getElementById('prix')
const email = document.getElementById('email')

function readFormData () {

    var v=false;
    var email=document.getElementById("emailAuteur").value,
    prix=document.getElementById("prix").value;


    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    

    //année entre 1900 a 9999
    const dateRegex=/^(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)$/ 

    var date=document.getElementById("date").value;


    if(!emailRegex.test(email)){ 
        v=false
        alert("Email dans Incorect Format !");
       
    }else if(prix <= 0){
        alert("Prix ne doit pas etre negatif !");
        v=false
    } else if(!dateRegex.test(date)){
        alert("Date dans Format Incorrect !");
        v=false
    }else{
        v=true
    }

    if(v===true){
        var formData = {
            titre : document.getElementById("titre").value,
            auteur : document.getElementById("auteur").value,
            prix : prix,
            emailAuteur:email,
            datePublication :date,
            langue:document.getElementById("langue").value,
            type:document.querySelector('input[name="type"]:checked').value
        };
    }

    let ouvr=new Ouvrage(formData.titre,formData.auteur ,formData.prix ,formData.datePublication,formData.langue,formData.type,formData.email)

    alert(ouvr.DetailOuvrage())

    if ((titre.value>='A' && titre.value<='Z') ||  (titre.value>='a' && titre.value<='z'))
    {
        console.log("validé")
    }
    else {
        alert("veillez saissir un titre valide ");
        document.getElementById("titre").focus();

    }

    if ((auteur.value>='A' && auteur.value<='Z') ||  (auteur.value>='a' && auteur.value<='z'))
    {
        console.log("validé")
    }
    else {
        alert("veillez saissir un nom d'auteur complet ");
        document.getElementById("titre").focus();

    }
        
    //insertition de la langue
  var langue = document.getElementById("langue").value;

  if  ( langue == '' )
  {
      alert("s'il vous-plait selectionner votre Langue")
      document.getElementById("titre").focus();
  }

  else {
      console.log("validé")
  }

    
  return formData; 
}





function  sortTable ( )  {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.querySelector("table");
    switching = true;
   
    while (switching) {
       switching = false;
      rows = table.rows;
   
      for (i = 1; i < (rows.length - 1); i++) {
  
        shouldSwitch = false;
   
        x = rows[i].getElementsByTagName("td")[0];
        y = rows[i + 1].getElementsByTagName("td")[0];
       
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
   
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
   





        class Ouvrage{ 
            constructor ( titre,auteur,prix,datePublication,langue,type,emailAuteur)
           {
             this.titre=titre;
            this.auteur=auteur;
            this.prix=prix;
            this.datePublication=datePublication;
            this.langue=langue;
            this.type=type;
            this.emailAuteur=emailAuteur;
        }
        DetailOuvrage() {
            return `l'ouvrage ${this.titre} est un ${this.type} en langue ${this.langue}, ecrit par ${this.auteur} et publié le ${this.datePublication} le prix de ${this.titre} est de ${this.prix} Dhs`;
        }
         
        }
        


function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.titre;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.auteur;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.prix;
    cell4=newRow.insertCell(3);
    cell4.innerHTML= data.emailAuteur;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.datePublication;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML=data.langue;
    cell7=newRow.insertCell(6);
    cell7.innerHTML=data.type;
    cell8=newRow.insertCell(7);
    cell8.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;

                       
                         var a;
                       if (localStorage.getItem('formData') === null) {
                           a = [];
                       } else {
                            a = JSON.parse(localStorage.getItem('formData'));
                        }
                        let loc = document.getElementById('lo')
                        a.push(data)

                         localStorage.setItem('formData', JSON.stringify(a));

                    


}

function resetForm() {
    document.getElementById("titre").value = "";
    document.getElementById("auteur").value = "";
    document.getElementById("prix").value = "";
    document.getElementById("emailAuteur").value="";
    document.getElementById("date").value = "";
    document.getElementById("langue").value="";

    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("titre").value = selectedRow.cells[0].innerHTML;
    document.getElementById("auteur").value = selectedRow.cells[1].innerHTML;
    document.getElementById("prix").value = selectedRow.cells[2].innerHTML;
    document.getElementById("emailAuteur").value=selectedRow.cells[3].innerHTML;
    document.getElementById("date").value = selectedRow.cells[4].innerHTML;
    document.getElementById("langue").value= selectedRow.cells[5].innerHTML;
    document.getElementById("type").value= selectedRow.cells[6].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.titre;
    selectedRow.cells[1].innerHTML = formData.auteur;
    selectedRow.cells[2].innerHTML = formData.prix;
    selectedRow.cells[3].innerHTML = formData.emailAuteur;
    selectedRow.cells[4].innerHTML = formData.date;
    selectedRow.cells[5].innerHTML= formData.langue;
    selectedRow.cells[6].innerHTML= formData.type;
}

function onDelete(td) {
    if (confirm(' Etes-vous sur de supprimer cet enregistrement ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

let btn = document.getElementById('btn')
btn.addEventListener('click', function() {
  window.print(),id='="employeeList"'
    
})



