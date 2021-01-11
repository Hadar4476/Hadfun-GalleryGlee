import React, { Component } from "react";

import Joi from "joi-browser";

import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  validateProperty({ name, value }) {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  renderTextArea = (name, label) => {
    const { data, errors } = this.state;
    let error = errors[name];
    let errorColor = "text-primary";
    return (
      <>
        <label htmlFor={name}>{label}</label>
        <textarea
          onChange={this.handleChange}
          className="form-control"
          name={name}
          id={name}
          cols="30"
          rows="10"
          value={data[name]}
        ></textarea>
        {error && <span className={errorColor}>* {error} *</span>}
      </>
    );
  };

  renderInput = (
    name,
    label,
    type = "text",
    background = "",
    color = "",
    border = "",
    autoComplete = "",
    errorColor = "text-primary"
  ) => {
    const { data, errors } = this.state;
    return (
      <Input
        onChange={this.handleChange}
        type={type}
        name={name}
        label={label}
        background={background}
        color={color}
        border={border}
        autoComplete={autoComplete}
        errorColor={errorColor}
        value={data[name]}
        error={errors[name]}
      />
    );
  };
  getGender = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data });
  };

  renderGenderSelection() {
    return (
      <>
        <p>Select Gender:</p>
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          onClick={this.getGender}
        />
        <label htmlFor="male" className="ml-2">
          Male
        </label>
        <br />
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          onClick={this.getGender}
        />
        <label htmlFor="female" className="ml-2">
          Female
        </label>
        <br />
      </>
    );
  }

  renderBtn(html, type, className, color = "", background = "") {
    return (
      <div className="text-right">
        <button
          onClick={this.validate}
          type={type}
          className={className}
          style={{ background: background, color: color }}
        >
          {html}
        </button>
      </div>
    );
  }
}

export default Form;
