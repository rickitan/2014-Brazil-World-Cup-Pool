var mongoose = require('mongoose');

var matchSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    groupPhase: {},
    secondStageMatches: {}
});


module.exports = mongoose.model('MatchSchema', matchSchema);
