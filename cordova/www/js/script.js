$(document).ready(function(){

    // Affiche le formulaire
    $('.searchAction').click(function(){

        $('.oneResult').hide();
        $('.resultSearch').hide();
        $('.formSearch').show();
    });

    // Lorsque le formulaire est soumis
    $('form').submit(function(e){

        // Annule l'action par défaut
        e.preventDefault();

        // Efface le message d'erreur
        errorMessage(false);

        // Affiche de loader
        $('.loaderForm').show();

        // Récupération des valeurs du formulaire
        var location = $('#lieu').val();
        var voyageurs = $('#voyageurs').val();
        dateStart = $('#du').val();
        dateEnd = $('#au').val();

        // Vérification du champs location
        if(!$('#lieu').val()){

            errorMessage(true, 'lieu','Vous devez remplir le champs "Lieu".');
        }

        // Date non valide
        if(verifDate(dateStart,dateEnd)){

            // Changement de page
            $('.listResult').html('');
            $('.formSearch').hide();
            $('.resultSearch').show();
            $('.loader').show();
            $('.loaderForm').hide();

            // Requete
            $.ajax({
                type : 'GET',
                dataType : 'json',
                url : 'https://www.airbnb.fr/search/search_results',
                data : 'location='+location+'&guests='+voyageurs+'&checkin='+du+'&checkout='+au,
                success : function (res) {

                    // Résultats
                    var results = res.results_json.search_results;

                    for(var result in results){

                        var html = "";

                        // Créer un résultat
                        html += "<div class='item' onclick='seeItem(this);'>";
                            html += "<div class='itemPicture'>";
                                html += "<img src='"+results[result].listing.picture_url+"' alt='image'/>";
                            html += '</div>';
                            html += "<div class='itemTitle'>";
                                html += results[result].listing.name;
                            html += '</div>';
                        html += '</div>';

                        // Cache de loader
                        $('.loader').hide();

                        // affiche les résultats
                        $('.listResult').append(html);

                    }
                }
            });    
        }

       
    });


});

// Date de début et de fin 
var dateStart = dateEnd = null;

// Vérification de la date
function verifDate(du,au){

    // Taille
    if(du.length < 3){

        errorMessage(true, 'du', 'Vous devez remplir le champs "Du".');
        return false;
    }

    // Taille
    if(au.length < 3){

        errorMessage(true, 'au', 'Vous devez remplir le champs "Au".');
        return false;
    }

    // Initilisation
    var now = new Date();
    var dateDu = new Date(du);
    var dateAu = new Date(au);

    // test > aujourd'hui
    if(dateDu.getTime() <= now.getTime()){

        errorMessage(true, 'du', 'La date "Du" doit être supérieur à la date d\'ajourd\'hui');
        return false;
    }

    // test au > du
    if(dateAu.getTime() <= dateDu.getTime()){

        errorMessage(true, 'au', 'La date "Au" doit être supérieur à la date "Du"');
        return false;
    }

    return true;
}

// Affiche les erreurs ou les efface
function errorMessage(error, id, message){

    if(error){

        // Affiche le message + loader
        $('#'+id).css('border-bottom','1px solid red');
        $('.errorForm').html(message);
        $('.loaderForm').hide();

    }else{

        // Efface le message
        $('#lieu, #du, #au').css('border-bottom','1px solid gray');
        $('.errorForm').html('');
    }

}

// Affiche un résultat
function seeItem(item){

    $('.resultSearch').hide();

    // Cache les messages précedents
    $('.loaderAction .success').hide();
    $('.loaderAction .error').hide();

    // Récupération et remplacement
    $('.pictureOneResult').html($(item).find('.itemPicture').html());
    $('.titleOneResult .itemTitle').html($(item).find('.itemTitle').html());

    $('.oneResult').show();

}

// Affiche la liste des résultats
function showList(){

    $('.oneResult').hide();
    $('.resultSearch').show();
}

