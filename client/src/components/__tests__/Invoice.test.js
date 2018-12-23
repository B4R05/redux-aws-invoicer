import React from "react";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";
import Invoice from "../Invoice";

describe("Invoice component", () => {
  it("props are passed to component", () => {
    const wrapped = shallow(<Invoice />);

    expect(wrapped.props()).toHaveProperty("children");
  });

  it("returns defaultProps values if Link is clicked without data", () => {
    const wrapped = shallow(<Invoice />);

    wrapped.find(Link).simulate("click");

    expect(wrapped.find(Link).props().to.data).toEqual({
      _id: "No id entered",
      amount_due: "No amount due entered",
      date_due: "Due Date unknown",
      date_paid: "Date Paid unknown",
      description: "No description entered",
      to: "Unknown company"
    });
  });
});
