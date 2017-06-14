angular.module('Platzi', []);
//angular.module('Platzi').controller('BaseCtrl', ['$scope', '$http', function($scope, $http){
angular.module('Platzi').controller('BaseCtrl', ['$scope', function($scope){

    io.socket.get('/emoji', function(data){
        $scope.emojis = data;
        $scope.$apply(); //this tell angular to render. if you dont use $http you have to tell it
    });

    io.socket.on('emoji', function(event){
        switch (event.verb){
            case 'created':
                $scope.emojis.push(event.data);
                $scope.$apply();
                break;
            case 'destroyed':
                for(var i = 0; i < $scope.emojis.length; i++){
                    if($scope.emojis[i].id === event.previous.id){
                        $scope.emojis.splice(i, 1);
                        $scope.$apply();
                        break;
                    }
                }
                break;
        }
    });

    /*$http.get('/emoji').then(function(response){
        $scope.emojis = response.data;
    });*/
    /*.catch(function(err){
        alert(err);
    });*/

    //Fake emojis
    /*$scope.emojis = [{
        id: 1,
        text: '=)'
    },
    {
        id: 2,
        text: ':-)'
    },
    {
        id: 3,
        text: '8)'
    },
    {
        id: 4,
        text: ':)'
    }];*/
}]);