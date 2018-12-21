exports.validatePostRequest = (req, res, next) => {
  const {
    to_value,
    date_due_value,
    date_paid_value,
    description_value,
    amount_due_value
  } = req.body;

  let date_received = new Date(date_paid_value);
  let date_today = new Date();

  if (
    to_value === "" ||
    date_due_value === "" ||
    description_value === "" ||
    amount_due_value === "" ||
    date_received > date_today
  ) {
    res
      .status(406)
      .send({ error: "Invalid field values. Invoice not created." });
  } else if (
    to_value &&
    date_due_value &&
    description_value &&
    amount_due_value
  ) {
    next();
  } else {
    res
      .status(400)
      .send({ error: "Missing field values. Invoice not created." });
  }
};

exports.validatePatchRequest = (req, res, next) => {
  if (!req.body.id) {
    res.status(304).send({ error: "No value received: update unsuccessful." });
  } else {
    next();
  }
};
