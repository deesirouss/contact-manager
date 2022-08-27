const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is required!";
  }
  if (!values.email) {
    errors.email = "Email is required!";
  }
  if (!values.phone) {
    errors.phone = "Phone is required!";
  } else if (values.phone.length > 10) {
    errors.phone = "Phone cannot exceed more than 10 characters";
  }
  if (!values.image) {
    errors.image = "Image is required!";
  }
  return errors;
};

export default validate;
