const mongoose = require("mongoose");
const Jobs = mongoose.model("Jobs");

module.exports.jobs = (req, res) => {
    let offset = 0;
    let count = 5;

    if (req.query && req.query.offet) {
        offset = parseInt(req.query.offet, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json({ "message": "QueryString Offset and Count should be numbers " });
        return;
    }

    Jobs.find().skip(offset).limit(count).exec((err, jobs) => {
        if (err) {
            console.log("There some error when getting the book", err);
            res.status(500).json({ "message": "There some error when getting the book" });
        } else {
            res.status(200).json(jobs);
        }
    });
}

module.exports.job = (req, res) => {
    const jobId = req.params.jobId;
    Jobs.findById(req.params.jobId).exec((err, job) => {
        if (err) {
            res.status(500).json({ "message": `Cannot get the job` });
        } else if (!job) {
            res.status(404).json({ "message": `Job ${jobId} not found` });
        } else {
            res.status(200).json(job);
        }
    });
}

module.exports.addJob = (req, res) => {
    if (!req.body) {
        res.status(400).json({ "message": "There's no job in body" });
    }
    const newJob = {};
    copyJob(req.body, newJob);

    Jobs.create(newJob, (err, job) => {
        if (err) {
            console.log("Cannot create the job", err);
            res.status(500).json({ "message": "Cannot create the job" });
        } else {
            res.status(201).json(job);
        }
    });

}

module.exports.updateFullJob = (req, res) => {
    findJobAndUpdate(req, res, updateFull());
}

module.exports.updatePartialJob = () => {
    findJobAndUpdate(req, res, updatePartial());
}

module.exports.deleteJob = (req, res) => {
    const jobId = req.params.jobId;
    Jobs.findByIdAndRemove(jobId).exec((err, job) => {
        const response = {
            status: 204,
            message: job
        };
        if (err) {
            res.status(400).json(err);
        } else if (!job) {
            response.status = 404;
            response.message = { "message": `job with ${jobId} not found` }
        }
        res.status(response.status).json(response.message);
    });
}

const findJobAndUpdate = (req, res, updateJobCallback) => {
    const jobId = req.params.jobId;
    Jobs.findById(jobId).exec((err, job) => {
        const response = {
            status: 204
        };
        if (err) {
            console.log("Cannot find job", err);
            response.status = 500;
            response.message = { "message": "Cannot find job" };
        } else if (!job) {
            response.status = 404;
            response.message = { "message": `Job ${jobId} not found` };
        }
        if (response.status != 204) {
            res.status(response.status).json(response.message);
        } else {
            updateJobCallback(req, job);
            job.save((err, savedJob) => {
                if (err) {
                    console.log("Cannot update job", err);
                    response.status = 500;
                    response.message = { "message": "Cannot update job" };
                } else {
                    response.message = savedJob;
                }
                console.log("Updated job", response.message);
                res.status(response.status).json(response.message);
            });
        }

    });
}

const copyJob = (sourceJob, targetJob) => {
    targetJob.title = sourceJob.title;
    targetJob.salary = sourceJob.salary;
    targetJob.location = sourceJob.location;
    targetJob.description = sourceJob.description;
    targetJob.experience = sourceJob.experience;
    targetJob.skills = sourceJob.skills;
    targetJob.postDate = sourceJob.postDate;
}

const checkAndUpdateJob = (sourceJob, targetJob) => {
    if (sourceJob.title) {
        targetJob.title = sourceJob.title;
    }
    if (sourceJob.salary) {
        targetJob.salary = parseFloat(sourceJob.salary);
    }
    if (sourceJob.location) {
        targetJob.location = sourceJob.location;
    }
    if (sourceJob.description) {
        targetJob.description = sourceJob.description;
    }
    if (sourceJob.experience) {
        targetJob.experience = sourceJob.experience;
    }
    if (sourceJob.skills) {
        targetJob.skills = sourceJob.skills;
    }
    if (sourceJob.postDate) {
        targetJob.postDate = sourceJob.postDate;
    }
}

const updateFull = () => {
    return (req, job) => {
        copyJob(req.body, job);
    };
}

const updatePartial = () => {
    return (req, job) => {
        checkAndUpdateJob(req.body, job);
    };
}