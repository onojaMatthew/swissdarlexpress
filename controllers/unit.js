const { Unit } = require("../models/unit");

exports.create = (req, res) => {
  const { unit, amount } = req.body;
  const { userId, role } = req.params;
  console.log(req.params)
  if (!unit || !amount) return res.status(400).json({ error: "All fields are required" });
  if (!userId || !role) return res.status(400).json({ error: "Invalid parameter values" });
  // if (role !== "admin" || role !== "super_admin") return res.status(400).json({ error: "You do not have the previlege to this operation" });

  let newUnit = new Unit({ unit, amount });
  return newUnit.save()
    .then(result => {
      if (!result) return res.status(400).json({ error: "Request failed" });
      return res.json(result);
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ error: err.message });
    });
}

exports.getUnit = (req, res) => {
  Unit.find({}, (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message })
    }
    res.json(data);
  });
}

exports.updateUnit = (req, res) => {
  const { role, unitId } = req.params;

  const userRoles = [ "super_admin", "admin" ];
  
  if (!role) return res.status(400).json({ error: "Invalid user role" });
  if (!userRoles.includes(role)) return res.status(400).json({ error: "Only admin can perform this operation" });

  Unit.findById({ _id: unitId })
    .then(unit => {
      if (!unit) return res.status(400).json({ error: "No record found" });
      if (req.body.amount) unit.amount = req.body.amount;
      if (req.body.unit) unit.unit = req.body.unit;

      unit.save();
      return res.json({ message: "Unit updated" });
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

exports.deleteUnit = (req, res) => {
  const { unitId, role } = req.params;
  if (!unitId || !role) return res.status(400).json({ error: "Invalid parameter values" });
  Unit.findByIdAndDelete({ _id: unitId }, (err, data) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    res.json({ message: "Unit deleted" });
  });
}