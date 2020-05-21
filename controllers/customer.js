const { Customer } = require("../models/customer");

exports.postCustomer = async (quote) => {
  const customer = await Customer.findOne({ email: quote.email });
  if (customer) return;
  let newCustomer = new Customer({
    company: quote.companyName,
    firstName: quote.contactFName,
    lastName: quote.contactLName,
    email: quote.email,
    phone: quote.phone
  });
  await newCustomer.save();
}

exports.getCustomers = (req, res) => {
  Customer.find()
    .then(customers => {
      if (!customers) return res.status(400).json({ error: "Records empty" });
      res.json(customers);
    })
    .catch(err => {
      return res.status(400).json({ error: err.message });
    });
}

exports.deleteCustomer = (req, res) => {
  const { customerId } = req.params;

  if (!customerId) return res.status(400).json({ error: "Invalid parameter values" });

  Customer.findByIdAndDelete({ _id: customerId})
    .then(customer => {
      if (!customer) return res.status(400).json({ error: "Customer not found" });
      res.json({ message: "Customer deleted" });
    });
}