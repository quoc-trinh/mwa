angular.module("meanJobs", ["ngRoute"]).config(config);

function config($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "angularjs-app/welcome/welcome.html"
    }).when("/jobs", {
        templateUrl: "angularjs-app/job-list/jobs.html",
        controller: "JobsController",
        controllerAs: "vm"
    }).when("/job/:id", {
        templateUrl: "angularjs-app/job-display/job.html",
        controller: "JobController",
        controllerAs: "vm"
    }).when("/job/update/:id", {
        templateUrl: "angularjs-app/job-edit/job-edit.html",
        controller: "JobEditController",
        controllerAs: "vm"
    }).otherwise({
        redirectTo: "/"
    })
}