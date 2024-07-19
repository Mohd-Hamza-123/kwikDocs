import React, { useEffect, useState } from "react";
import Select, { MultiValue, ActionMeta } from "react-select";

interface OptionType {
  value: string;
  label: string;
}

const options: OptionType[] = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const MultiSelect = ({ value, onChange }: { value: any; onChange: any }) => {
  // console.log(value);
  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<OptionType>
  >([]);
  // console.log(selectedOptions);

  const handleChange = (
    selected: MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    setSelectedOptions(selected);
    onChange(selected);
  };

  useEffect(() => {
    setSelectedOptions((prev) => value);
  }, []);

  return (
    <Select
      isMulti
      options={options}
      value={selectedOptions}
      onChange={handleChange}
    />
  );
};

export default MultiSelect;
