import React from "react";
import Select from "react-select";

const renderInputField = ({
  input,
  label,
  placeholder,
  disabled,
  type,
  readonly,
  id,
  pattern,
  title,
  meta: { touched, error }
}) => (
    <div className={"form-group" + (error && touched ? " text-danger" : "")}>
      <label>{label}</label>
      <input
        {...input}
        type={type}
        autoComplete={input.name}
        readOnly={readonly}
        id={id}
        placeholder={placeholder}
        pattern={pattern}
        title={title}
        disabled={disabled}
        className={"form-control" + (error && touched ? " is-invalid" : "")}
      />

      {touched && error && (
        <div className="invalid-feedback">Email is required</div>
      )}
    </div>
  );

const renderSelectField = ({
  input,
  label,
  dynamic_values,
  error_state,
  disabled,
  meta: { touched, error }
}) => (
    <div
      className={
        "form-group" +
        ((error && touched) || error_state === 1 ? " has-error" : "")
      }
    >
      <label>{label}</label>
      <select {...input} disabled={disabled} className="form-control">
        <option value="">Select</option>
        {dynamic_values}
      </select>
      {error_state === 1 && <div className="help-block">{error}</div>}
      {touched && error && <div className="help-block">{error}</div>}
    </div>
  );

const renderTextAreaField = ({
  input,
  label,
  type,
  sameValue,
  disabled,
  placeholder,
  textarea,
  meta: { touched, error, warning, invalid }
}) => {
  // (sameValue && sameValue !== '') ? input = (input) => {  } : input.value = input.value;
  sameValue && sameValue !== ""
    ? (input.value = sameValue)
    : (input.value = input.value);
  const textareaType = (
    <textarea
      {...input}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
      className={`form-control ${touched && invalid ? "has-danger" : ""}`}
    />
  );

  return (
    <div className="">
      <div className={"form-group" + (error && touched ? " has-error" : "")}>
        <label>{label}</label>
        <div>
          {" "}
          {textarea ? textareaType : ""}
          {touched &&
            ((error && <div className="help-block">{error}</div>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </div>
    </div>
  );
};

const renderInputHiddenField = ({ input, id }) => (
  <input {...input} type={"hidden"} id={id} />
);

const renderCheckboxField = ({
  input,
  label,
  checked,
  disabled,
  meta: { touched, error },
  ...param
}) => {
  return (
    <label className="custom-checkbox ">
      <input type="checkbox" disabled={disabled} {...input} checked={checked} />
      <span className="checkmark">{label}</span>
    </label>
  );
};

const renderReactSelectField = ({
  input,
  label,
  placeholder,
  dynamic_values,
  error_state,
  meta: { touched, error },
  ...field
}) => (
    <div
      className={
        "form-group" +
        ((error && touched) || error_state === 1 ? " has-error" : "")
      }
    >
      <label>{label}</label>
      <Select
        {...field}
        value={input.value}
        onChange={value => input.onChange(value)}
        onBlur={() => input.onBlur(input.value)}
        options={dynamic_values}
        placeholder={placeholder}
      //className="form-control"
      />

      {error_state === 1 && <div className="help-block">{error}</div>}
      {touched && error && <div className="help-block">{error}</div>}
    </div>
  );

export {
  renderInputField,
  renderSelectField,
  renderTextAreaField,
  renderInputHiddenField,
  renderCheckboxField,
  renderReactSelectField
};
