import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";

class FormTextField extends React.Component {
  renderInputOrDisplay() {
    const { label, input, width, disabled, meta } = this.props;
    if (this.props.editMode) {
      return (
        <Form.Input
          label={label}
          value={input.value}
          onChange={input.onChange}
          width={width}
          disabled={disabled}
          error={meta.invalid}
          placeholder={meta.invalid.toString() && "Required"}
        />
      );
    } else {
      if (this.props.largeTextSpans) {
        return (
          <Fragment>
            <h5>{label}</h5>
            <h2>{input.value}</h2>
          </Fragment>
        );
      } else {
        return (
          <Fragment>
            <span>{label}</span>
            <span>{input.value}</span>
          </Fragment>
        );
      }
    }
  }

  render() {
    return this.renderInputOrDisplay();
  }
}

FormTextField.propTypes = {
  editMode: PropTypes.bool.isRequired,
  label: PropTypes.string,
  input: PropTypes.object,
  disabled: PropTypes.bool,
  meta: PropTypes.object
};

const mapStateToProps = state => {
  return { editMode: state.invoices.editMode };
};

export default connect(
  mapStateToProps,
  null
)(FormTextField);
