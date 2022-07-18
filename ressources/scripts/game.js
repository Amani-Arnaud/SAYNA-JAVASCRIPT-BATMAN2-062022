$(document).ready(function() {

    // ############################################
    // ## DEFINITION DES INDEPENDANTE AU QUIZ #####
    // ############################################

    // Click sur le bouton demarrer le quiz
    $('#btn-start').click(function() {
        $('#quiz-box').slideDown(1000);
        $('#intro-quiz').slideUp(2000);
    });
    // Fin bouton demarrer

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


    // ############ [FIN FONCTION ANNEXE]##########

    // ################################
    // ## INTERRACTION AVEC L'API #####
    // ################################
    $.ajax({
        url: 'https://octopus-app-2u6og.ondigitalocean.app/questions/all',
        datatype: 'json',
        success: function(questions) {

            // DECLARATION DES VARIABLES LOCALE
            let totalPoint = 0;
            let currentQuiz = 0; // index de la question courente
            let totalQuiz = questions.length;
            // FIN VARIABLE LOCAL

            $('#total-quiz').text(totalQuiz); // Afficher le nombre total de Questions
            setForm(questions[currentQuiz].question, questions[currentQuiz].response, 1); // Afficher la premiere question

            // Soumission de la reponse de l'utilisateur
            $('#formulaire').submit(function(e) {
                e.preventDefault();

                let chooseResponse = isChooseResponse(questions, currentQuiz);
                let isChoose = chooseResponse[0];
                let userResponse = chooseResponse[1];
                // si l'index de la question est inferieur au total
                if (currentQuiz < (totalQuiz - 1)) {

                    if (isChoose) { // Sinon valider le formulaire 
                        $('#quiz-box').slideUp(1000).slideDown(1000);
                        currentQuiz++; // augmenter

                        setTimeout(() => {
                            if (currentQuiz < totalQuiz) {
                                setForm(questions[currentQuiz].question, questions[currentQuiz].response, (currentQuiz + 1)); // Afficher la prochaine question question
                            }
                        }, 1000);

                        if (currentQuiz === totalQuiz) { //Si l'index des questio est égale à total Quiz
                            $('#btn-next').val('Voir le resultat').attr("id", "btn-resume");
                        }
                        console.log(userResponse);
                        totalPoint = userResponse === true ? (totalPoint + 1) : totalPoint; // Si c'est une bonne reponse augmenter le total des points
                        userResponse = "false"; // nouvelle question fausse reponse
                        console.log(totalPoint);
                    }
                } else {
                    if (isChoose) {
                        console.log(userResponse);
                        totalPoint = userResponse === true ? (totalPoint + 1) : totalPoint; // Si c'est une bonne reponse augmenter le total des points
                        console.log(totalPoint);
                        if (totalPoint <= (totalQuiz / 3)) {
                            $('#titre').text("0" + totalPoint + "/" + totalQuiz + " c'est pas tout à fait ça...");
                            $('#msg-result').text("Oula ! Heureusement que le Riddler est sous verrous... Il faut que vous vous repassiez les films, cette fois en enlevant peut-être le masque qui vous a bloqué la vue! Aller, rien n'est perdu !");
                        } else if (totalPoint <= (totalQuiz / 2)) {
                            $('#titre').text(totalPoint + "/" + totalQuiz + " pas mal !");
                            $('#msg-result').text("Encore un peu d'entraînement avec le Chevalier Noir vous serait bénéfique, mais vous pouvez marcher la tête haute, vos connaissances sont là. A vous de les consolider, foncez Gotham est votre de chasse !");
                        } else {
                            $('#titre').text(totalPoint + "/" + totalQuiz + " bravo !");
                            $('#msg-result').text("Vous êtes véritablement un super fan de l'univers de Batman ! Comics, films, rien ne vous échappe. Bruce Wayne a de quoi être fier, Gotham est en paix et Batman peut prendre sa retraite, vous veillez aux grains");
                        }
                        $('#popup-result').css("display", "flex");
                    }
                }
            }); // Fin
        },
        error: function(questions) {
            console.log(questions);
        },
    });

    // ###########################################################
    // ##  Fonction de verification si user choisir une reponse ##
    // ###########################################################

    function isChooseResponse(questions, currentQuiz) {
        // Variable locale
        let notChoose = true;
        let userResponse = false; // [par la suite] faire de cette variable un tableau qui recupere les reponses de User

        // Controle si l'utilisateur à choisir une reponse
        for (let i = 0; i < questions[currentQuiz].response.length; i++) {
            if ($('#checkbox' + i).is(":checked")) {
                notChoose = false;
                userResponse = questions[currentQuiz].response[i].isGood;
                console.log(questions[currentQuiz].response[i].isGood);
            }
        }
        // Fin controle

        if (notChoose) { // Si aucune reponse n'est choisi afficher un message d'erreur
            $('#error-message').css("color", "red").text("Choisissez une reponse !");
            return [false, userResponse];
        } else { // Sinon valider le formulaire 
            return [true, userResponse];
        }
    }

    // #########################################
    // ##  Fonction de changement de question ##
    // #########################################
    function setForm(question, response, nbreQuiz) {
        $('#img-illustrate').attr("src", "./ressources/assets/game/Batgame_" + (2 + nbreQuiz) + ".png");
        $('#number-quiz').text(nbreQuiz);
        $('#quiz-question').empty();
        $('#quiz-question').append("<p class='question' id='question'></p>");
        $('#question').text(question);
        for (let i = 0; i < response.length; i++) {
            $('#quiz-question').append("<label for='checkbox" + i + "' class='response' id ='" + i + "'></label>");
            $('#' + i).append("<input type='checkbox' name='choix' id='checkbox" + i + "'>");
            $('#' + i).append("<p id='response" + i + "' > " + response[i].text + " </p>");
        }
        $('#quiz-question').append("<span id='error-message'></span>");
    }

});