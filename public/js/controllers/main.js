'use strict';
var  app = angular.module('quinielaApp');

/*app.service('MatchSchema',function ($resource) {
    return $resource("/matchSchema/:id", { id: "@id" },
        {    update: { method: "PUT" },
            query:  { method: "GET", isArray:false} //ffor bug in angular-resource
        }
    );
});*/


app.controller('MainCtrl', function ($scope, MatchSchema, $http, CleanGroupSchema, $filter) {
        $scope.user = window.user;
        $scope.groupsMatches = CleanGroupSchema.groupsMatches;
        $scope.secondStageMatches = CleanGroupSchema.secondStageMatches;
        if(window.user){
            MatchSchema.get({id: window.user.id}, function(schema){
                if(schema.groupPhase && schema.secondStageMatches){
                    $scope.groupsMatches = schema.groupPhase;
                    $scope.secondStageMatches = schema.secondStageMatches
                }
            });
        }

        $scope.groupsLayout = [['A','B','C'],['D','E'],['F','G','H']]; //For iterating and adding table in the middle with standing

        $scope.saveMatchSchema = function(){
            MatchSchema.save({id:window.user.id, groupsMatches: $scope.groupsMatches, secondStageMatches: $scope.secondStageMatches}, function(){
              alert("Your pool have been saved!");
            });
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


        function countriesThatPass(){
          _.each($scope.groupsMatches, function(groupData, group){

            var orderBy = ["points", "goalDifference", "goalsInFavor"];
            var standingHolder = _.pairs(groupData.standing);
            var passingCountries = [];

            for(var i=0;i<orderBy.length;i++){
              var tiebreaked = tieBreaker(standingHolder, orderBy[i], group); //0 => passing; 1=> tied
              passingCountries.push.apply(passingCountries, tiebreaked[0]);
              standingHolder = tiebreaked[1];
              if(passingCountries >= 2) break;
            }

            /*if(passingCountries <= 1){
              for(var i=0;i<orderBy.length;i++){
                var tiebreaked = deepTieBreaker(standingHolder, orderBy[i], group); //0 => passing; 1=> tied
                passingCountries.push.apply(passingCountries, tiebreaked[0]);
                standingHolder = tiebreaked[1];
                if(passingCountries >= 2) break;
              }
            }*/



            if(passingCountries){
              $scope.standing[group][0]["country"] = passingCountries[0] ? passingCountries[0][0] : null;
              $scope.standing[group][1]["country"] = passingCountries[1] ? passingCountries[1][0] : null;
            }else{
              $scope.standing[group][0]["country"] = "";
              $scope.standing[group][1]["country"] = "";
            }


          })
          $scope.secondStageMatches.roundOf16.A[0].country = $scope.standing.A[0].country;
          $scope.secondStageMatches.roundOf16.A[1].country = $scope.standing.B[1].country;

          $scope.secondStageMatches.roundOf16.B[0].country  = $scope.standing.C[0].country
          $scope.secondStageMatches.roundOf16.B[1].country = $scope.standing.D[1].country;

          $scope.secondStageMatches.roundOf16.C[0].country  = $scope.standing.E[0].country;
          $scope.secondStageMatches.roundOf16.C[1].country = $scope.standing.F[1].country;

          $scope.secondStageMatches.roundOf16.D[0].country  = $scope.standing.G[0].country;
          $scope.secondStageMatches.roundOf16.D[1].country = $scope.standing.H[1].country;

          $scope.secondStageMatches.roundOf16.E[0].country  = $scope.standing.B[0].country;
          $scope.secondStageMatches.roundOf16.E[1].country = $scope.standing.A[1].country;

          $scope.secondStageMatches.roundOf16.F[0].country  = $scope.standing.D[0].country;
          $scope.secondStageMatches.roundOf16.F[1].country = $scope.standing.C[1].country;

          $scope.secondStageMatches.roundOf16.G[0].country  = $scope.standing.F[0].country;
          $scope.secondStageMatches.roundOf16.G[1].country = $scope.standing.E[1].country;

          $scope.secondStageMatches.roundOf16.H[0].country  = $scope.standing.H[0].country;
          $scope.secondStageMatches.roundOf16.H[1].country = $scope.standing.G[1].country;

        }

        function tieBreaker(countryPairs, orderBy, group){
          var countriesOrdered = _.chain(countryPairs).sortBy(function(pair){return pair[1][orderBy]}).reverse().value();
          return passingTied(countriesOrdered, orderBy);
        }

        function passingTied(countriesOrdered, orderBy){
          var passingCountries = []; //null null null null
          var tiedCountries = [];
          //console.log("Countries ORDERED", countriesOrdered);
          //countriesOrdered[i][1][orderBy]
          while(countriesOrdered.length > 0){
            //if(countriesOrdered.length == 1){ passingCountries.push(countriesOrdered[0]); break; }

            if((countriesOrdered.length > 1) && (countriesOrdered[0][1][orderBy] > countriesOrdered[1][1][orderBy])){ //First one passes
              passingCountries.push(countriesOrdered.shift())
            }else if((countriesOrdered.length == 1) && (tiedCountries == 0)){
              passingCountries.push(countriesOrdered.shift()) //Last element and no one tied
            }else if(countriesOrdered.length > 1 && (countriesOrdered[0][1][orderBy] == countriesOrdered[1][1][orderBy])){ //Tie
              var tied = false;
              while(countriesOrdered.length > 1 && (countriesOrdered[0][1][orderBy] == countriesOrdered[1][1][orderBy]) ){
                tied = true;
                tiedCountries.push(_.flatten(countriesOrdered.splice(1,1)));
              }
              tiedCountries.push(countriesOrdered.shift());
            }
            if(tiedCountries.length > 0 || passingCountries.length == 2) break;
          }
          return [passingCountries, tiedCountries];
        }


        function deepTieBreaker(countryPairs, orderBy, group){
          //console.log("Country Pairs Deep Tie Break", countryPairs);
          _.each(countryPairs, function(pair){pair[1].points = 0; pair[1].goalsInFavor = 0; pair[1].goalsAgainst = 0;  pair[1].goalDifference = 0 });
          var groupMatches = $scope.groupsMatches[group].matches;
          var selectedMatches = [];
          var countryNames = _.map(countryPairs, function(pair){ return pair[0]}); //["mexico", "brazil", "cameroon", "croatia"]
          _.each(groupMatches, function(match){
            for(var i=0; i<countryNames.length; i++){
              if(match[0].country == countryNames[i]){
                for(var j=0; j<countryNames.length; j++){
                    if(match[1].country == countryNames[j]){
                      selectedMatches.push(match);
                    }
                }
              }
            }
          });
          countryPairs = calculateStandingTieBreaker(countryPairs, selectedMatches);
          var countriesOrdered = _.chain(countryPairs).sortBy(function(pair){return pair[1][orderBy]}).reverse().value();
          return passingTied(countriesOrdered, orderBy);
        }

        function calculateStandingTieBreaker(countryPairs, selectedMatches){
          var pairsObject = _.object(countryPairs);
          _.each(selectedMatches, function(match){
            if(match[0].score > match[1].score){
              pairsObject[match[0].country].points += 3;
            }else if(match[0].score < match[1].score){
              pairsObject[match[1].country].points += 3;
            }else{
              pairsObject[match[0].country].points += 1;
              pairsObject[match[1].country].points += 1;
            }
            //Goals in favor and against
            pairsObject[match[0].country].goalsInFavor += match[0].score;
            pairsObject[match[0].country].goalsAgainst += match[1].score;
            pairsObject[match[1].country].goalsInFavor += match[1].score;
            pairsObject[match[1].country].goalsAgainst += match[0].score;
            //Goal Difference
            pairsObject[match[0].country].goalDifference += match[0].score - match[1].score;
            pairsObject[match[1].country].goalDifference += match[1].score - match[0].score;
          });
          return _.pairs(pairsObject);
        }







        $scope.standing = { //Countries that pass the first round
            A: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
            B: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
            C: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
            D: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
            E: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
            F: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
            G: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
            H: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}]
        };


        $scope.$watch("secondStageMatches.roundOf16", function(newVal){ //Calculate who passes to quarter finals
            var matchHolder = [];
            var concaTitle = "";
            _.each($scope.secondStageMatches.roundOf16, function(match, title){
                if(match[0].score === null && match[1].score === null){
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
                if(match[0].score === null && match[1].score === null){
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
            var thirdFourthHolder = [];
            var concaTitle = "";
            _.each($scope.secondStageMatches.semiFinals, function(match, title){
                if(match[0].score === null && match[1].score === null){
                    matchHolder.push({country: null});
                    thirdFourthHolder.push({country: null});
                }
                else if(match[0].score > match[1].score){
                    matchHolder.push(_.clone(match[0]));
                    thirdFourthHolder.push(match[1]);
                }else if(match[0].score < match[1].score){
                    matchHolder.push(_.clone(match[1]));
                    thirdFourthHolder.push(match[0]);
                }else{
                    if(match[0].victorByPenalties){
                      matchHolder.push(_.clone(match[0]));
                      thirdFourthHolder.push(match[1]);
                    }else{
                      matchHolder.push(_.clone(match[1]));
                      thirdFourthHolder.push(match[0]);
                    }
                }
                concaTitle += title;
                if(matchHolder.length === 2){
                    $scope.secondStageMatches.final[concaTitle][0]["country"] = matchHolder[0]["country"];
                    $scope.secondStageMatches.final[concaTitle][1]["country"] = matchHolder[1]["country"];
                    //Third and fourth
                    $scope.secondStageMatches.thirdFourth[concaTitle][0]["country"] = thirdFourthHolder[0]["country"];
                    $scope.secondStageMatches.thirdFourth[concaTitle][1]["country"] = thirdFourthHolder[1]["country"];
                    matchHolder = [];
                    thirdFourthHolder = [];
                    concaTitle = "";
                }
            })
        }, true);


        /*$scope.$watch("secondStageMatches.final", function(){ //Calculate who passes to quarter finals
          var matchHolder = [];
          _.each($scope.secondStageMatches.final, function(match, title){
            if(match[0].score === "" && match[1].score === ""){
              matchHolder.push({country: null});
            }else if(match[0].score > match[1].score){
              matchHolder.push(_.clone(match[0]));
            }else if(match[0].score < match[1].score){
              matchHolder.push(_.clone(match[1]));
            }else{
              _.each(match, function(country){ country.victorByPenalties ? matchHolder.push(_.clone(country)) : null });
            }

            if(matchHolder.length === 1){
              $scope.secondStageMatches.champion.champion[0]["country"] = matchHolder[0]["country"];
              matchHolder = [];
            }
          })
        }, true);*/

        $scope.victorByPenalties = function(round, title, winnerIndex){
            _.each($scope.secondStageMatches[round][title], function(country, index){
                country.victorByPenalties = (winnerIndex == index) ? true : false;
            })
            //console.log($scope.secondStageMatches[round][title]);
        }

    });

