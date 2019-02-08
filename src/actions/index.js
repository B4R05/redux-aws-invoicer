import axios from "axios";

const baseURL =
  "https://nyrsgtmoql.execute-api.us-east-1.amazonaws.com/prod/invoice";

//ASYNCHRONOUS ACTION CREATORS
export const fetchInvoices = token => dispatch => {
  axios
    .get(baseURL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    })
    .then(response => {
      dispatch({
        type: "FETCH_INVOICES",
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: "FETCH_INVOICES",
        payload: err
      });
    });
};

export const saveInvoice = (object, token) => dispatch => {
  axios
    .post(baseURL, object, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    })
    .then(response => {
      dispatch({
        type: "SAVE_INVOICE",
        payload: response
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: "SAVE_INVOICE",
        payload: err
      });
    });
};

//SYNCHRONOUS ACTION CREATORS
export const getToken = token => {
  return {
    type: "GET_TOKEN",
    payload: token
  };
};

export const initialise = array => {
  return {
    type: "INITIALISE",
    payload: array
  };
};

export const onCancel = id => {
  return {
    type: "ON_CANCEL",
    payload: id
  };
};

export const toggleEditMode = boolean => {
  return {
    type: "EDIT_MODE",
    payload: boolean
  };
};

export const selectedInvoice = id => {
  return {
    type: "SELECTED_INVOICE",
    payload: id
  };
};

export const newInvoice = () => {
  return {
    type: "NEW_INVOICE"
  };
};
