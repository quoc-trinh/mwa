angular.module("meanJobs").controller("JobsController", JobController);

function JobController($route, JobDataFactory) {
    const vm = this;

    JobDataFactory.getAllJobs().then(function(response) {
        vm.jobs = response;
    });

    vm.formJob = {};
    vm.addJob = function() {
        console.log(vm.formJob);
        if (vm.jobForm.$valid) {
            JobDataFactory.addOneJob(vm.formJob).then(function(response) {
                vm.message = "Job saved";
                $route.reload();
            }).catch(function(error) {
                vm.err = error.message;
                console.log(error);
            });
        } else {}
    };

    vm.deleteJob = function(jobId) {
        if (confirm("Are you sure you want to delete this job?")) {
            JobDataFactory.deleteOneJob(jobId).then(function(response) {
                console.log(response);
                vm.message = "Job has been deleted successfully";
            });
        };
    }
}