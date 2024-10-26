import React, { useCallback } from "react";
import module from "./checkbox.module.css";

const Checkbox = ({ checked, onChange = () => {}, label = "Resolved" }) => {
  const handleCheckboxChange = useCallback(() => {
    onChange(!checked);
  }, [checked, onChange]);

  return (
    <div className={module.checkbox}>
      <input
        type="checkbox"
        className={module.resolved_checkbox}
        checked={checked}
        onChange={handleCheckboxChange}
      />
      <label className={module.resolved_label}>
        {checked === true ? label : ""}
      </label>
    </div>
  );
};
export default Checkbox;
