angular.module("meanJobs").directive("jobsNavigation", JobsNavigation);

function JobsNavigation() {
    return {
        restrict: "E",
        templateUrl: "angularjs-app/navigation-directive/navigation-directive.html",
        scope: {
            stars: "@"
        }
    };
}