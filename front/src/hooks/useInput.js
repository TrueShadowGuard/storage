import {useState} from "react";

export default function useInput(options) {
  const [value, setValue] = useState(options.defaultValue || "");

  const validationErrors = options?.validate(value);

  return [value, setValue, validationErrors]
}
