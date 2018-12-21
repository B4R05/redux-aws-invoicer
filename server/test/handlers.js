const mongoose = require("mongoose");
const Invoice = require("../schemas/InvoiceSchema");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("Invoices", () => {
  // beforeEach(done => {
  //   //Before each test we empty the database
  //   Invoice.remove({}, err => {
  //     done();
  //   });
  // });

  describe("/GET invoice", () => {
    it("it should GET all the invoices", done => {
      chai
        .request(server)
        .get("/invoice")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.not.be.eql(0);
          done();
        });
    });
  });

  describe("/POST invoice", () => {
    it("it should not POST without to, date_due, amount_due, description fields", done => {
      let invoice = {
        date_paid: ""
      };
      chai
        .request(server)
        .post("/invoice")
        .send(invoice)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.be.eql(
            "Missing field values. Invoice not created."
          );
          done();
        });
    });

    it("it should POST an invoice ", done => {
      let invoice = {
        to_value: "Company X",
        date_due_value: "12/12/2018",
        date_paid_value: "12/12/2018",
        description_value: "Example description",
        amount_due_value: "1000"
      };
      chai
        .request(server)
        .post("/invoice")
        .send(invoice)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("New invoice created");
          done();
        });
    });
  });

  describe("/PATCH", () => {
    it("it should UPDATE an invoice given the id", done => {
      chai
        .request(server)
        .patch("/invoice")
        .send({ id: "5c1d0445f4bb30401d580f10", date_paid_value: "12/12/2018" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("_id").eql("5c1d0445f4bb30401d580f10");
          res.body.should.have.property("date_paid").eql("12/12/2018");

          done();
        });
    });
  });
});
