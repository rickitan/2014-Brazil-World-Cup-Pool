'use strict';
var  app = angular.module('quinielaApp');

/*app.service('MatchSchema',function ($resource) {
    return $resource("/matchSchema/:id", { id: "@id" },
        {    update: { method: "PUT" },
            query:  { method: "GET", isArray:false} //ffor bug in angular-resource
        }
    );
});*/


app.controller('MainCtrl', function ($scope, MatchSchema, $http, CleanGroupSchema) {

        if(window.user){
            MatchSchema.get({id: window.user.id}, function(schema){
                if(schema.groupPhase && schema.secondStageMatches){
                    $scope.groupsMatches = schema.groupPhase;
                    $scope.secondStageMatches = schema.secondStageMatches
                }
            });
        }

        $scope.groupsLayout = [['A','B','C'],['D','E'],['F','G','H']]; //For iterating and adding table in the middle with standing
        $scope.groupsMatches = CleanGroupSchema.groupsMatches;
        $scope.secondStageMatches = CleanGroupSchema.secondStageMatches

        $scope.saveMatchSchema = function(){
            MatchSchema.save({id:window.user.id, groupsMatches: $scope.groupsMatches, secondStageMatches: $scope.secondStageMatches});
        }




        $scope.$watch("groupsMatches.A.matches ", function(newVal){
            calculateStandings();
        }, true);
        $scope.$watch("groupsMatches.B.matches ", function(newVal){
            calculateStandings();
        }, true);
        $scope.$watch("groupsMatches.C.matches ", function(newVal){
            calculateStandings();
        }, true);
        $scope.$watch("groupsMatches.D.matches ", function(newVal){
            calculateStandings();
        }, true);
        $scope.$watch("groupsMatches.E.matches ", function(newVal){
            calculateStandings();
        }, true);
        $scope.$watch("groupsMatches.F.matches ", function(newVal){
            calculateStandings();
        }, true);
        $scope.$watch("groupsMatches.G.matches ", function(newVal){
            calculateStandings();
        }, true);
        $scope.$watch("groupsMatches.H.matches ", function(newVal){
            calculateStandings();
        }, true);

        function calculateStandings(){
            clearPoints();
            _.each($scope.groupsMatches, function(groupData, group){
                _.each(groupData.matches, function(match){
                    if(match[0].score > match[1].score){
                        groupData.standing[match[0].country].points += 3;
                    }else if(match[0].score < match[1].score){
                        groupData.standing[match[1].country].points += 3;
                    }else{
                        groupData.standing[match[0].country].points += 1;
                        groupData.standing[match[1].country].points += 1;
                    }
                    //Goals in favor and against
                    groupData.standing[match[0].country].goalsInFavor += match[0].score;
                    groupData.standing[match[0].country].goalsAgainst += match[1].score;
                    groupData.standing[match[1].country].goalsInFavor += match[1].score;
                    groupData.standing[match[1].country].goalsAgainst += match[0].score;
                    //Goal Difference
                    groupData.standing[match[0].country].goalDifference += match[0].score - match[1].score;
                    groupData.standing[match[1].country].goalDifference += match[1].score - match[0].score;
                })
            })
            countriesThatPass();
        }

        function clearPoints(){
            _.each($scope.groupsMatches, function(groupData, group){
                _.each(groupData.matches, function(match){
                    groupData.standing[match[0].country].points = 0;
                    groupData.standing[match[1].country].points = 0;
                    //Goal in favor and against
                    groupData.standing[match[0].country].goalsInFavor = 0;
                    groupData.standing[match[0].country].goalsAgainst = 0;
                    groupData.standing[match[1].country].goalsInFavor = 0;
                    groupData.standing[match[1].country].goalsAgainst = 0;
                    //Goal Diff
                    groupData.standing[match[0].country].goalDifference = 0;
                    groupData.standing[match[1].country].goalDifference = 0;
                })
            })
        }

        function tieBreaker(countryPairs, orderBy){ //orderBy can be points goalDifference goalsInFavor goalsAgainst
            var countriesOrdered = _.chain(countryPairs).sortBy(function(pair){return pair[1][orderBy]}).reverse().value();
            var nextOrderBy = 'couldnt break the tie';
            switch (orderBy){
                case 'points':
                    nextOrderBy = "goalDifference";
                    break;
                case 'goalDifference':
                    nextOrderBy = "goalsInFavor"
                    break;
                default:
                    //alert("Demasiada rebuscada tu opción, añade goles!");
                    //TO DO: More Validations;
                    return null;
                    break;
            }

            console.log("countries ordered", countriesOrdered);
            if(countriesOrdered.length > 2){
                if( (countriesOrdered[0][1][orderBy] > countriesOrdered[1][1][orderBy]) && (countriesOrdered[1][1][orderBy] > countriesOrdered[2][1][orderBy]) ){
                    //pasa primero y segundo *
                    return [countriesOrdered[0][0], countriesOrdered[1][0]];
                }else if((countriesOrdered[0][1][orderBy] == countriesOrdered[1][1][orderBy]) && (countriesOrdered[1][1][orderBy] > countriesOrdered[2][1][orderBy])){
                    //primero y segundo empatados *
                    return tieBreaker([countriesOrdered[0], countriesOrdered[1]], nextOrderBy)
                }else if( (countriesOrdered[0][1][orderBy] > countriesOrdered[1][1][orderBy]) && (countriesOrdered[1][1][orderBy] == countriesOrdered[2][1][orderBy]) && (countriesOrdered[2][1][orderBy] > countriesOrdered[3][1][orderBy])){
                    //pasa primer, segundo y tercero empatados *
                    return _.flatten([countriesOrdered[0][0], tieBreaker([countriesOrdered[1], countriesOrdered[2]], nextOrderBy)]);
                }else if( (countriesOrdered[0][1][orderBy] == countriesOrdered[1][1][orderBy] == countriesOrdered[2][1][orderBy]) && (countriesOrdered[2][1][orderBy] > countriesOrdered[3][1][orderBy]) ){
                    //Primero segundo y tercero empatados
                    return tieBreaker([countriesOrdered[0], countriesOrdered[1], countriesOrdered[2]], nextOrderBy)
                }else if(countriesOrdered[0][1][orderBy] == countriesOrdered[1][1][orderBy] == countriesOrdered[2][1][orderBy] == countriesOrdered[3][1][orderBy]){
                    //Todos empatados
                    return tieBreaker(countriesOrdered, nextOrderBy)
                }
            }else if(countriesOrdered.length == 2){
                if( (countriesOrdered[0][1][orderBy] > countriesOrdered[1][1][orderBy]) ){
                    return [countriesOrdered[0][0], countriesOrdered[1][0]]
                }else if( (countriesOrdered[0][1][orderBy] < countriesOrdered[1][1][orderBy]) ){
                    return [countriesOrdered[1][0], countriesOrdered[0][0]]
                }else{
                    return tieBreaker(countriesOrdered, nextOrderBy)
                }
            }
        }


        function countriesThatPass(){
            _.each($scope.groupsMatches, function(groupData, group){

                var passingCountries = tieBreaker(_.pairs(groupData.standing), "points");

                console.log("passing countries", passingCountries);

                if(passingCountries){
                    $scope.standing[group][0]["country"] = passingCountries[0];
                    $scope.standing[group][1]["country"] = passingCountries[1];
                }else{
                    $scope.standing[group][0]["country"] = "";
                    $scope.standing[group][1]["country"] = "";
                }


            })
            $scope.secondStageMatches.roundOf16.A = [_.clone($scope.standing.A[0]), _.clone($scope.standing.B[1])];
            $scope.secondStageMatches.roundOf16.B = [_.clone($scope.standing.C[0]), _.clone($scope.standing.D[1])];
            $scope.secondStageMatches.roundOf16.C = [_.clone($scope.standing.E[0]), _.clone($scope.standing.F[1])];
            $scope.secondStageMatches.roundOf16.D = [_.clone($scope.standing.G[0]), _.clone($scope.standing.H[1])];
            $scope.secondStageMatches.roundOf16.E = [_.clone($scope.standing.B[0]), _.clone($scope.standing.A[1])];
            $scope.secondStageMatches.roundOf16.F = [_.clone($scope.standing.D[0]), _.clone($scope.standing.C[1])];
            $scope.secondStageMatches.roundOf16.G = [_.clone($scope.standing.F[0]), _.clone($scope.standing.E[1])];
            $scope.secondStageMatches.roundOf16.H = [_.clone($scope.standing.H[0]), _.clone($scope.standing.G[1])];
        }

        $scope.standing = { //Countries that pass the first round
            A: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
            B: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
            C: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
            D: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
            E: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
            F: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
            G: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
            H: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}]
        };


        $scope.$watch("secondStageMatches.roundOf16", function(newVal){ //Calculate who passes to quarter finals
            var matchHolder = [];
            var concaTitle = "";
            _.each($scope.secondStageMatches.roundOf16, function(match, title){
                if(match[0].score === "" && match[1].score === ""){
                    matchHolder.push({country: null});
                }
                else if(match[0].score > match[1].score){
                    matchHolder.push(_.clone(match[0]));
                }else if(match[0].score < match[1].score){
                    matchHolder.push(_.clone(match[1]));
                }else{
                    _.each(match, function(country){ country.victorByPenalties ? matchHolder.push(_.clone(country)) : null });
                }

                concaTitle += title;
                if(matchHolder.length === 2){
                    $scope.secondStageMatches.quarterFinals[concaTitle][0]["country"] = matchHolder[0]["country"];
                    $scope.secondStageMatches.quarterFinals[concaTitle][1]["country"] = matchHolder[1]["country"];
                    matchHolder = [];
                    concaTitle = "";
                }
            })
        }, true);

        $scope.$watch("secondStageMatches.quarterFinals", function(){ //Calculate who passes to quarter finals
            var matchHolder = [];
            var concaTitle = "";
            _.each($scope.secondStageMatches.quarterFinals, function(match, title){
                if(match[0].score === "" && match[1].score === ""){
                    matchHolder.push({country: null});
                }else if(match[0].score > match[1].score){
                    matchHolder.push(_.clone(match[0]));
                }else if(match[0].score < match[1].score){
                    matchHolder.push(_.clone(match[1]));
                }else{
                    _.each(match, function(country){ country.victorByPenalties ? matchHolder.push(_.clone(country)) : null });
                }
                concaTitle += title;
                if(matchHolder.length === 2){
                    $scope.secondStageMatches.semiFinals[concaTitle][0]["country"] = matchHolder[0]["country"];
                    $scope.secondStageMatches.semiFinals[concaTitle][1]["country"] = matchHolder[1]["country"];
                    matchHolder = [];
                    concaTitle = "";
                }
            })
        }, true);

        $scope.$watch("secondStageMatches.semiFinals", function(){ //Calculate who passes to quarter finals
            var matchHolder = [];
            var concaTitle = "";
            _.each($scope.secondStageMatches.semiFinals, function(match, title){
                if(match[0].score === "" && match[1].score === ""){
                    matchHolder.push({country: null});
                }
                else if(match[0].score > match[1].score){
                    matchHolder.push(_.clone(match[0]));
                }else if(match[0].score < match[1].score){
                    matchHolder.push(_.clone(match[1]));
                }else{
                    _.each(match, function(country){ country.victorByPenalties ? matchHolder.push(_.clone(country)) : null });
                }
                concaTitle += title;
                if(matchHolder.length === 2){

                    $scope.secondStageMatches.final[concaTitle][0]["country"] = matchHolder[0]["country"];
                    $scope.secondStageMatches.final[concaTitle][1]["country"] = matchHolder[1]["country"];
                    matchHolder = [];
                    concaTitle = "";
                }
            })
        }, true);


        $scope.victorByPenalties = function(round, title, winnerIndex){
            _.each($scope.secondStageMatches[round][title], function(country, index){
                country.victorByPenalties = (winnerIndex == index) ? true : false;
            })
            console.log($scope.secondStageMatches[round][title]);
        }

    });

