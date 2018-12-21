const Invoice = require("../schemas/InvoiceSchema");

exports.newInvoice = (req, res) => {
  Invoice.create(
    {
      to: req.body.to_value,
      date_due: req.body.date_due_value,
      date_paid: req.body.date_paid_value,
      description: req.body.description_value,
      amount_due: req.body.amount_due_value
    },
    err => {
      if (err) {
        res.status(500).send({
          error: "Internal server error: could not create a new invoice."
        });
        console.log(err);
      }
      res.status(201).send("New invoice created");
    }
  );
};

exports.getInvoices = (req, res) => {
  Invoice.find({}, (err, found) => {
    if (err) {
      res
        .status(500)
        .send({ error: "Internal server error: could not retrieve invoices." });
      console.log(err);
    }
    res.status(200).send(found);
  });
};

exports.updateInvoice = (req, res) => {
  Invoice.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { date_paid: req.body.date_paid_value } },
    { new: true },
    (err, updated_invoice) => {
      if (err) {
        res.status(304).send({ error: "Server error: update unsuccessful." });
        console.log(err);
      }
      res.status(200).send(updated_invoice);
    }
  );
};
