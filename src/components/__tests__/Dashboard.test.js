import React from "react";
import { shallow } from "enzyme";
import moxios from "moxios";
import Dashboard from "../auth/Dashboard";
import FetchError from "../spinners/FetchError";

let wrapped;

beforeEach(() => {
  wrapped = shallow(<Dashboard />);
  moxios.stubRequest("http://localhost:8080/invoice", {
    status: 200,
    response: [
      {
        amount_due: "3333",
        date_due: "2018-12-12",
        date_paid: "2018-12-04",
        description: "Refurbishment service",
        to: "Company 1"
      },
      {
        amount_due: "2000",
        date_due: "2018-12-14",
        date_paid: "",
        description: "Catering service",
        to: "Company 2"
      },
      {
        amount_due: "1000",
        date_due: "2018-12-16",
        date_paid: "",
        description: "Plumbing service",
        to: "Company 3"
      },
      {
        amount_due: "4000",
        date_due: "2018-12-19",
        date_paid: "2018-12-18",
        description: "Misc service",
        to: "Company 4"
      },
      {
        amount_due: "1000",
        date_due: "2018-12-12",
        date_paid: "",
        description: "Example description",
        to: "Company X"
      }
    ]
  });

  moxios.install();
});

afterEach(() => {
  moxios.uninstall();
});

describe("Dashboard component", () => {
  it("componentDidMount calculates paid and pending invoices from fetched array", async done => {
    await wrapped.instance().componentDidMount();

    moxios.wait(() => {
      wrapped.update();
      expect(wrapped.state().paid_invoices).toEqual(2);
      expect(wrapped.state().pending_invoices).toEqual(3);
      done();
      wrapped.unmount();
    });
  });

  it("shows <FetchError /> component if server error detected", () => {
    wrapped.setState({ error: true });
    expect(wrapped.find(FetchError).length).toEqual(1);
  });
});
