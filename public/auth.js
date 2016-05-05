var app = new angular.module('auth-module', []);

app.factory('auth', [
  '$http',
  function($http){
    var auth = {};

    auth.register = function(user, then){
      user_info = {
        username: user.username,
        password: sha256_digest(user.password)
      };

        return $http.post('register', user_info).then(function(response){
        if(response.data.status == "succeed"){
          then({success : true});
        }
        else if(response.data.status == "db_error"){
          then({success: false, error: "Impossible de se connecter à la base de donnée"});
        }
        else if(response.data.status == "insert_error"){
          then({success: false, error: "Impossible de créer le compte"})
        }
        else{
          then({success: false, error: "Erreur inconnue !"});
        }
      }, function(response){
        then({success: false, error: "Erreur inconnue !"});
      });
    };

    auth.login = function(user, then){
        user_info = {
          username: user.username,
          password: sha256_digest(user.password)
        };

        return $http.post('login', user_info).then(function(response){
                if(response.data.status == "succeed"){
                    then({success: true});
                }
                else if(response.data.status == "db_error"){
                  then({success: false, error: "Impossible de se connecter à la base de donnée"});
                }
                else if(response.data.status == "invalid"){
                    then({success: false, error:"Mauvais identifiant et/ou mot de passe !"});
                }
                else{
                    then({success: false, error: "Erreur inconnue !"});
                }
            },
            function(response){
                then({success: false, error: "Erreur inconnue lors de l'accès au service !"});
            }
        );
    };

    auth.logout = function(then){
      $http.post('logout').then(function(response){
        if(response.data.status == "succeed"){
          then({success: true});
        }
        else if(response.data.status == "was_not_connected"){
          then({success: true, error: "Vous n'êtes pas connecté."});
        }
        else{
          then({success: false, error: "Erreur inconnue"});
        }
      }, function(response){
        then({success: false, error: "Erreur inconnue"});
      });
    };

    auth.currentUser = function(){

    };

    return auth;
}]);
