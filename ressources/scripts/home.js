window.onload = function() {
    let email = document.getElementById('email');
    let acceptCondition = document.getElementById('accept');
    let selectFrequence = document.getElementById('frequence');
    let choix = document.getElementsByName('choix');
    let message = document.getElementById('message');



    let formulaire = document.getElementById('form-contact');
    formulaire.addEventListener('submit', function(e) {
        e.preventDefault();
        document.getElementById('popup').style.display = 'flex';
    });
    let body = document.querySelector('body');
    body.onclick = function() {
        document.getElementById('popup').style.display = 'none';
    }
}