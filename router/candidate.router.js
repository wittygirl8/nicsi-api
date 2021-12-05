const CandidateController = require("../controller/candidate.controller");
const express = require('express');
const multer = require('multer');
const adminLogin = require('../middleware/admin')
const userAuth = require('../middleware/user')
const coordinatorLogin = require('../middleware/coordinator')
const CandidateRouter = express.Router();



const storage = multer.memoryStorage({
    destination: (req, file, callback) => {
        callback(null, '')
    }
});

const upload = multer({
    storage: storage
})

CandidateRouter.post('/get-approved-candidate', adminLogin, CandidateController.getApprovedCandidate);
CandidateRouter.post('/get-pending-candidate', adminLogin, CandidateController.getPendingCandidates);
CandidateRouter.post('/update-pending-candidate', adminLogin, CandidateController.updatePendingCandidates);
CandidateRouter.post('/get-reject-candidate', adminLogin, CandidateController.getRejectCandidates);
CandidateRouter.post('/get-candidate-by-id', adminLogin, CandidateController.getCandidateId);
CandidateRouter.post('/upload-document', userAuth, upload.single('file'), CandidateController.uploadDocument);
CandidateRouter.post('/update-designation', adminLogin, CandidateController.updateDesignation);
CandidateRouter.post('/get-all-candidate-by-project', coordinatorLogin, CandidateController.getAllCandidateByProject);
CandidateRouter.post('/get-each-candidate-by-id', coordinatorLogin, CandidateController.getCandidateId);
CandidateRouter.post('/update-attendance', coordinatorLogin, CandidateController.updateAttendance);
module.exports = CandidateRouter;