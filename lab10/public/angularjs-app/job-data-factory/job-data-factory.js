angular.module("meanJobs").factory("JobDataFactory", jobDataFactory);

function jobDataFactory($http) {
    return {
        getAllJobs: getAll,
        getOneJob: getOne,
        addOneJob: addOne,
        updateOneJob: updateOne,
        deleteOneJob: deleteOne,
        addReview: addReview
    }

    function getAll() {
        return $http.get("/api/jobs").then(complete).catch(failed);
    }

    function addOne(game) {
        return $http.post("/api/jobs/", game).then(complete).catch(failed);
    }

    function getOne(id) {
        return $http.get("/api/jobs/" + id).then(complete).catch(failed);
    }

    function deleteOne(id) {
        return $http.delete("/api/jobs/" + id).then(complete).catch(failed);
    }

    function updateOne(job) {
        return $http.put("/api/jobs/" + job._id, job).then(complete).catch(failed);
    }

    function addReview(jobId, review) {
        return $http.put("/api/jobs/" + jobId + "/reviews", review).then(complete).catch(failed);
    }

    function complete(response) {
        console.log(response.data);
        return response.data;
    }

    function failed(error) {
        return error.status.statusText;
    }
}