angular.module("meanJobs").controller("JobEditController", JobEditController);

function JobEditController(JobDataFactory, $routeParams) {
    const vm = this;
    vm.formJob = {};

    JobDataFactory.getOneJob($routeParams.id).then(function(response) {
        vm.formJob = response;
        vm.formJob.skills = vm.formJob.skills ? vm.formJob.skills.toString() : "";
    });

    vm.updateBook = () => {
        if (vm.jobForm.$valid) {
            JobDataFactory.updateOneJob(vm.formJob).then(function(response) {
                console.log("Job is updated");
            }).catch((err) => {
                console.log("Cannot update job", err);
            });
        }
    }
}