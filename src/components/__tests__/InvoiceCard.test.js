// import React from "react";
// import { shallow } from "enzyme";
// import InvoiceCard from "../invoice/InvoiceCard";
// import InvoiceCardHeader from "../invoice/InvoiceCardHeader";
//
// let wrapped;
//
// let fakeProps = {
//   data: {
//     amount_due: "3333",
//     date_due: "2018-12-12",
//     date_paid: "2018-12-04",
//     description: "Refurbishment service",
//     to: "Company 1",
//     _id: "5c1d0445f4bb30401d580f10"
//   },
//   renderButtons: jest.fn(),
//   editDatePaid: jest.fn(),
//   showMessage: jest.fn()
// };
//
// describe("InvoiceCard component", () => {
//   it("shows 5 InvoiceCardHeaders", () => {
//     wrapped = shallow(<InvoiceCard {...fakeProps} />);
//
//     expect(wrapped.find(InvoiceCardHeader).length).toEqual(5);
//   });
// });
