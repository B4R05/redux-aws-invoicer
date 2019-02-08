//validate function for redux-form
export const validate = values => {
  const errors = {};
  if (!values.orderDate) {
    errors.orderDate = "Required";
  }
  if (!values.orderStatus) {
    errors.orderStatus = "Required";
  }
  if (!values.to) {
    errors.to = "Required";
  }
  if (!values.from) {
    errors.from = "Required";
  }
  if (!values.TotalCost) {
    errors.TotalCost = "Required";
  }

  if (!values.itemsTable || !values.itemsTable.length) {
    errors.itemsTable = { _error: "At least invoice item must be entered" };
  } else {
    const itemsTableArrayErrors = [];
    values.itemsTable.forEach((invoiceItem, invoiceItemIndex) => {
      const invoiceItemErrors = {};
      if (!invoiceItem || !invoiceItem.itemCode) {
        invoiceItemErrors.itemCode = "Required";
        itemsTableArrayErrors[invoiceItemIndex] = invoiceItemErrors;
      }
      if (!invoiceItem || !invoiceItem.itemDescription) {
        invoiceItemErrors.itemDescription = "Required";
        itemsTableArrayErrors[invoiceItemIndex] = invoiceItemErrors;
      }
      if (!invoiceItem || !invoiceItem.itemCategory) {
        invoiceItemErrors.itemCategory = "Required";
        itemsTableArrayErrors[invoiceItemIndex] = invoiceItemErrors;
      }
      if (!invoiceItem || !invoiceItem.itemUnitPrice) {
        invoiceItemErrors.itemUnitPrice = "Required";
        itemsTableArrayErrors[invoiceItemIndex] = invoiceItemErrors;
      }
      if (!invoiceItem || !invoiceItem.itemAmount) {
        invoiceItemErrors.itemAmount = "Required";
        itemsTableArrayErrors[invoiceItemIndex] = invoiceItemErrors;
      }
    });
    if (itemsTableArrayErrors.length) {
      errors.itemsTable = itemsTableArrayErrors;
    }
  }
  return errors;
};
