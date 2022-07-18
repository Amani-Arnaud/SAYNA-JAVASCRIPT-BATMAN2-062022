window.onload = function() {

    // Varables des champs du formulaire
    let email = document.getElementById('email');
    let acceptCondition = document.getElementById('accept');
    let selectFrequence = document.getElementById('frequence');
    let choix = document.getElementsByName('choix');
    let message = document.querySelector('message');
    // Fin 

    // Variable des span message d'Erreur
    let errorEmail = document.getElementById('error-email');
    let errorAccept = document.getElementById('error-accept');
    let errorFrequence = document.getElementById('error-frequence');
    let errorChoix = document.getElementById('error-choix');
    let errorMessage = document.getElementById('error-message');
    let valid = true;
    //FIN

    let formulaire = document.getElementById('form-contact');
    formulaire.addEventListener('submit', function(e) {
        e.preventDefault();
        // if (email.value == "") {
        //     errorEmail.innerHTML = "Message";
        //     errorEmail.style.color = 'red';
        //     errorEmail.style.textAlign = 'left';
        //     valid = false;
        // }
        // if (valid) {
        //     document.getElementById('popup').style.display = 'flex';
        // }
        document.getElementById('popup').style.display = 'flex';
        console.log(email.value);
        console.log(acceptCondition.checked);
        console.log(selectFrequence.selected);
        console.log(choix);
        console.log(message);
    });
    let body = document.querySelector('body');
    body.onclick = function() {
        document.getElementById('popup').style.display = 'none';
    }


    // #### Effet scroll
    $('#top-arrow').click(function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    });
    $('#down-arrow').click(function() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    });
    // Fin effet scroll

    // Effet en scrollant
    // Fin
}