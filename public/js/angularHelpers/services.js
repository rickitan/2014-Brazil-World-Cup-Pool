'use strict';
var  app = angular.module('quinielaApp', ['ngResource']);

app.service('MatchSchema',function ($resource) {
    return $resource("/matchSchema/:id", { id: "@id" },
        {    update: { method: "PUT" },
            query:  { method: "GET", isArray:false} //ffor bug in angular-resource
        }
    );
});