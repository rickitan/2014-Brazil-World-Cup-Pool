'use strict';
var  app = angular.module('quinielaApp', ['ngResource']);

app.factory('MatchSchema',function ($resource) {
    return $resource("/user/:id/matchSchema", { id: "@id" },
        {    update: { method: "PUT" },
            query:  { method: "GET", isArray:false} //ffor bug in angular-resource
        }
    );
});

app.factory('CleanGroupSchema', function(){
    return {
        groupsMatches : {
            A: { matches:[
                [{country: "brazil", score:0}, {country: "croatia", score:0}],
                [{country: "mexico", score:0}, {country: "cameroon", score:0}],
                [{country: "brazil", score:0}, {country: "mexico", score:0}],
                [{country: "cameroon", score:0}, {country: "croatia", score:0}],
                [{country: "cameroon", score:0}, {country: "brazil", score:0}],
                [{country: "croatia", score:0}, {country: "mexico", score:0}]
            ],
                standing: {
                    brazil: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    mexico: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    cameroon:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    croatia:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 }
                }
            },
            B: { matches:[
                [{country: "spain", score:0}, {country: "netherlands", score:0}],
                [{country: "chile", score:0}, {country: "australia", score:0}],
                [{country: "spain", score:0}, {country: "chile", score:0}],
                [{country: "australia", score:0}, {country: "netherlands", score:0}],
                [{country: "australia", score:0}, {country: "spain", score:0}],
                [{country: "netherlands", score:0}, {country: "chile", score:0}]
            ],
                standing: {
                    spain: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    chile:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    australia:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    netherlands:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 }
                }
            },
            C: { matches:[
                [{country: "colombia", score:0}, {country: "greece", score:0}],
                [{country: "costamarfil", score:0}, {country: "japan", score:0}],
                [{country: "colombia", score:0}, {country: "costamarfil", score:0}],
                [{country: "japan", score:0}, {country: "greece", score:0}],
                [{country: "japan", score:0}, {country: "colombia", score:0}],
                [{country: "greece", score:0}, {country: "costamarfil", score:0}]
            ],
                standing: {
                    colombia: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    costamarfil:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    japan:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    greece:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 }
                }
            },
            D: { matches:[
                [{country: "uruguay", score:0}, {country: "costarica", score:0}],
                [{country: "england", score:0}, {country: "italy", score:0}],
                [{country: "uruguay", score:0}, {country: "england", score:0}],
                [{country: "italy", score:0}, {country: "costarica", score:0}],
                [{country: "italy", score:0}, {country: "uruguay", score:0}],
                [{country: "costarica", score:0}, {country: "england", score:0}]
            ],
                standing: {
                    uruguay: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    england:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    italy:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    costarica:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 }
                }
            },
            E: { matches:[
                [{country: "switzerland", score:0}, {country: "ecuador", score:0}],
                [{country: "france", score:0}, {country: "honduras", score:0}],
                [{country: "switzerland", score:0}, {country: "france", score:0}],
                [{country: "honduras", score:0}, {country: "ecuador", score:0}],
                [{country: "honduras", score:0}, {country: "switzerland", score:0}],
                [{country: "ecuador", score:0}, {country: "france", score:0}]
            ],
                standing: {
                    switzerland: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    france:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    honduras:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    ecuador:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 }
                }
            },
            F: { matches:[
                [{country: "argentina", score:0}, {country: "bosnia", score:0}],
                [{country: "iran", score:0}, {country: "nigeria", score:0}],
                [{country: "argentina", score:0}, {country: "iran", score:0}],
                [{country: "nigeria", score:0}, {country: "bosnia", score:0}],
                [{country: "nigeria", score:0}, {country: "argentina", score:0}],
                [{country: "bosnia", score:0}, {country: "iran", score:0}]
            ],
                standing: {
                    argentina: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    iran:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    nigeria:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    bosnia:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 }
                }
            },
            G: { matches:[
                [{country: "germany", score:0}, {country: "portugal", score:0}],
                [{country: "ghana", score:0}, {country: "usa", score:0}],
                [{country: "germany", score:0}, {country: "ghana", score:0}],
                [{country: "usa", score:0}, {country: "portugal", score:0}],
                [{country: "usa", score:0}, {country: "germany", score:0}],
                [{country: "portugal", score:0}, {country: "ghana", score:0}]
            ],
                standing: {
                    germany: {points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    ghana:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    usa:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 },
                    portugal:{points:0, goalsInFavor:0, goalsAgainst:0, goalDifference:0 }
                }
            },
            H: { matches:[
                [{country: "belgium", score:0}, {country: "algeria", score:0}],
                [{country: "russia", score:0}, {country: "korea", score:0}],
                [{country: "belgium", score:0}, {country: "russia", score:0}],
                [{country: "korea", score:0}, {country: "algeria", score:0}],
                [{country: "korea", score:0}, {country: "belgium", score:0}],
                [{country: "algeria", score:0}, {country: "russia", score:0}]
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
                A: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
                B: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
                C: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
                D: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
                E: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
                F: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
                G: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
                H: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}]
            },
            "quarterFinals":{
                AB: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
                CD: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
                EF: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
                GH: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}]
            },
            "semiFinals":{
                ABCD: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}],
                EFGH: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}]
            },
            "final":{
                ABCDEFGH: [{country: "", score:"", victorByPenalties:true}, {country: "", score:"", victorByPenalties:false}]
            }
        }
    }
})
