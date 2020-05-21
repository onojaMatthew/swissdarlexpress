const { Report } = require("../models/reports");

exports.postReport = (req, res) => {
  const { _id } = req.user;
  const { title, report } = req.body;

  if (!_id) return res.status(400).json({ error: "Unknown user" });
  if (!title || !report) return res.status(400).json({ error: "All fields are required" });

  let newReport = new Report({
    reporter: _id,
    title,
    report
  });

  newReport.save((err, data) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(data);
  });
}

exports.getReports = (req, res) => {
  Report.find()
    .populate("reporter", "fullname")
    .then(result => {
      if (!result) return res.status(400).json({ error: "No records found" });
      return res.json(result);
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

exports.deleteReport = (req, res) => {
  const { reportId } = req.params;

  if (!reportId) return res.status(400).json({ error: "Invalid parameter values" });
  Report.findOneAndDelete({ _id: reportId})
    .then(result => {
      if (!result) return res.status(400).json({ error: "Report not found" });
      res.json({ message: "Report deleted" });
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}