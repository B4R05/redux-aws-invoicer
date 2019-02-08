const INITIAL_STATE = {
  editMode: false,
  invoices: [],
  selectedInvoice: {},
  httpResponse: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "INITIALISE":
      return { ...state, invoices: action.payload };

    case "SAVE_INVOICE":
      return { ...state, httpResponse: action.payload };

    case "FETCH_INVOICES":
      return { ...state, invoices: action.payload };

    case "SELECTED_INVOICE":
      const foundInvoice = state.invoices.find(
        obj => obj.InvoiceID === action.payload
      );
      return { ...state, selectedInvoice: foundInvoice };

    case "NEW_INVOICE":
      const newInvoice = {
        InvoiceID: Math.random()
          .toString(36)
          .substr(2, 6),
        orderStatus: "Pending",
        orderDate: "",
        from: "",
        to: "",
        itemsTable: [
          {
            itemUnitPrice: 0,
            itemDescription: "Example Description",
            itemAmount: 0,
            itemCategory: 1,
            itemCostTotal: 0,
            itemCode: 0
          }
        ],
        TotalCost: 0
      };

      return { ...state, selectedInvoice: newInvoice };

    case "EDIT_MODE":
      return { ...state, editMode: action.payload };

    default:
      return state;
  }
};
