import React from "react";
import { shallow } from "enzyme";
import InvoiceDetails from "../invoice/InvoiceDetails";
import InvoiceCard from "../invoice/InvoiceCard";

let wrapped;

beforeEach(() => {
  const fakeProps = {
    location: {
      pathname: "/invoices/5c1d0445f4bb30401d580f10",
      data: {
        amount_due: "3333",
        date_due: "2018-12-12",
        date_paid: "2018-12-04",
        description: "Refurbishment service",
        to: "Company 1",
        __v: 0,
        _id: "5c1d0445f4bb30401d580f10"
      },
      search: "",
      hash: "",
      key: "f99b7e"
    }
  };

  wrapped = shallow(<InvoiceDetails {...fakeProps} />);
});

describe("InvoiceDetails component", () => {
  it("Parent props are passed to component to display", async () => {
    await wrapped.instance().componentDidMount();

    expect(wrapped.state().date_paid_value).toEqual("2018-12-04");
  });

  it("renders an instance of InvoiceCard", () => {
    expect(wrapped.find(InvoiceCard).length).toEqual(1);
  });
});
