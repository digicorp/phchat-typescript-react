export function submitFailure(fieldList) {
  return errors => {
    if (!errors) {
      return false;
    }
    // Field Error(s). We need to step through fieldList to guarantee ordering (since redux-form returns an errors object, not array or map)
    fieldList.find(field => {
      if (errors[field]) {
        const elem = document.querySelector(
          `input[name=${field}], select[name=${field}]`
        );
        if (elem) {
          elem.focus();
          return true;
        }
      }
      // continue stepping through fieldList
      return false;
    });
  };
}
