angular.module("meanJobs").controller("JobController", JobController);

function JobController($routeParams, JobDataFactory, $route) {
    const vm = this;
    const jobId = $routeParams.id;

    JobDataFactory.getOneJob(jobId).then(function(response) {
        vm.job = response;
        vm.formJob = response;
    });

    vm.toggleEditForm = function() {
        vm.showEditForm = !vm.showEditForm;
    }

    vm.updateOneJob = function() {
        if (vm.jobForm.$valid) {
            console.log(vm.formJob);
            vm.formJob.skill = vm.formJob.skills[0];
            JobDataFactory.updateOneJob(vm.formJob).then(function(response) {
                vm.message = "Job has been saved successfully"
            });
        }
    }
    vm.addReview = function() {
        if (vm.reviewForm.$valid) {
            JobDataFactory.addReview(jobId, vm.formReview).then(function(response) {
                $route.reload();
            });
        }
    }
}