'use strict';
var  app = angular.module('quinielaApp', ['ngResource']);

app.factory('MatchSchema',function ($resource) {
    return $resource("/user/:id/matchSchema", { id: "@id" },
        {    update: { method: "PUT" },
            query:  { method: "GET", isArray:false} //ffor bug in angular-resource
        }
    );
});

app.factory('Rankings',function ($resource) {
  return $resource("/userRankings", {},
    {    update: { method: "PUT" },
      query:  { method: "GET", isArray:true} //ffor bug in angular-resource
    }
  );
});


app.factory('CleanGroupSchema', function(){
    return {
        groupsMatches : {
            A: { matches:[
                [{country: "brazil", score:null}, {country: "croatia", score:null}],
                [{country: "mexico", score:null}, {country: "cameroon", score:null}],
                [{country: "brazil", score:null}, {country: "mexico", score:null}],
                [{country: "cameroon", score:null}, {country: "croatia", score:null}],
                [{country: "cameroon", score:null}, {country: "brazil", score:null}],
                [{country: "croatia", score:null}, {country: "mexico", score:null}]
            ],
                standing: {
                    brazil: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    mexico: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    cameroon:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    croatia:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 }
                }
            },
            B: { matches:[
                [{country: "spain", score:null}, {country: "netherlands", score:null}],
                [{country: "chile", score:null}, {country: "australia", score:null}],
                [{country: "spain", score:null}, {country: "chile", score:null}],
                [{country: "australia", score:null}, {country: "netherlands", score:null}],
                [{country: "australia", score:null}, {country: "spain", score:null}],
                [{country: "netherlands", score:null}, {country: "chile", score:null}]
            ],
                standing: {
                    spain: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    chile:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    australia:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    netherlands:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 }
                }
            },
            C: { matches:[
                [{country: "colombia", score:null}, {country: "greece", score:null}],
                [{country: "costamarfil", score:null}, {country: "japan", score:null}],
                [{country: "colombia", score:null}, {country: "costamarfil", score:null}],
                [{country: "japan", score:null}, {country: "greece", score:null}],
                [{country: "japan", score:null}, {country: "colombia", score:null}],
                [{country: "greece", score:null}, {country: "costamarfil", score:null}]
            ],
                standing: {
                    colombia: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    costamarfil:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    japan:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    greece:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 }
                }
            },
            D: { matches:[
                [{country: "uruguay", score:null}, {country: "costarica", score:null}],
                [{country: "england", score:null}, {country: "italy", score:null}],
                [{country: "uruguay", score:null}, {country: "england", score:null}],
                [{country: "italy", score:null}, {country: "costarica", score:null}],
                [{country: "italy", score:null}, {country: "uruguay", score:null}],
                [{country: "costarica", score:null}, {country: "england", score:null}]
            ],
                standing: {
                    uruguay: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    england:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    italy:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    costarica:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 }
                }
            },
            E: { matches:[
                [{country: "switzerland", score:null}, {country: "ecuador", score:null}],
                [{country: "france", score:null}, {country: "honduras", score:null}],
                [{country: "switzerland", score:null}, {country: "france", score:null}],
                [{country: "honduras", score:null}, {country: "ecuador", score:null}],
                [{country: "honduras", score:null}, {country: "switzerland", score:null}],
                [{country: "ecuador", score:null}, {country: "france", score:null}]
            ],
                standing: {
                    switzerland: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    france:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    honduras:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    ecuador:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 }
                }
            },
            F: { matches:[
                [{country: "argentina", score:null}, {country: "bosnia", score:null}],
                [{country: "iran", score:null}, {country: "nigeria", score:null}],
                [{country: "argentina", score:null}, {country: "iran", score:null}],
                [{country: "nigeria", score:null}, {country: "bosnia", score:null}],
                [{country: "nigeria", score:null}, {country: "argentina", score:null}],
                [{country: "bosnia", score:null}, {country: "iran", score:null}]
            ],
                standing: {
                    argentina: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    iran:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    nigeria:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    bosnia:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 }
                }
            },
            G: { matches:[
                [{country: "germany", score:null}, {country: "portugal", score:null}],
                [{country: "ghana", score:null}, {country: "usa", score:null}],
                [{country: "germany", score:null}, {country: "ghana", score:null}],
                [{country: "usa", score:null}, {country: "portugal", score:null}],
                [{country: "usa", score:null}, {country: "germany", score:null}],
                [{country: "portugal", score:null}, {country: "ghana", score:null}]
            ],
                standing: {
                    germany: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    ghana:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    usa:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    portugal:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 }
                }
            },
            H: { matches:[
                [{country: "belgium", score:null}, {country: "algeria", score:null}],
                [{country: "russia", score:null}, {country: "korea", score:null}],
                [{country: "belgium", score:null}, {country: "russia", score:null}],
                [{country: "korea", score:null}, {country: "algeria", score:null}],
                [{country: "korea", score:null}, {country: "belgium", score:null}],
                [{country: "algeria", score:null}, {country: "russia", score:null}]
            ],
                standing: {
                    belgium: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    russia:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    korea:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    algeria:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 }
                }
            }
        },
        secondStageMatches: {
            "roundOf16":{
                A: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
                B: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
                C: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
                D: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
                E: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
                F: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
                G: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
                H: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}]
            },
            "quarterFinals":{
                AB: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
                CD: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
                EF: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
                GH: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}]
            },
            "semiFinals":{
                ABCD: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}],
                EFGH: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}]
            },
            "thirdFourth":{
              ABCDEFGH: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}]
            },
            "final":{
                ABCDEFGH: [{country: "", score:null, victorByPenalties:true}, {country: "", score:null, victorByPenalties:false}]
            }
        }
    }
})
