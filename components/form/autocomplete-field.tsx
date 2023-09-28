import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField } from '@mui/material';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export type AutocompleteFieldProps<T, K extends FieldValues> = Partial<
  AutocompleteProps<T, boolean, boolean, undefined>
> & {
  name: Path<K>;
  control: Control<K>;

  placeholder?: string;
  label?: string;

  options: T[];
  getOptionLabel: (option: T) => string; // nhận vào 1 option có kiểu dữ liệu T và trả về 1 string để render lên giao diện
  onChange: (selectedOptions: T[]) => void;
};

export function AutocompleteField<T, K extends FieldValues>({
  name,
  control,
  onChange: externalOnChange, // không cho user overide lại các thuộc tính này
  // onBlur: externalOnBlur,
  // ref: externalRef,
  // value: externalValue,
  placeholder,
  label,
  options,
  getOptionLabel,
  isOptionEqualToValue,
  ...rest
}: AutocompleteFieldProps<T, K>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control });

  // render to UI: MUI, Ant Design, Bootstrap, Custom UI
  return (
    // <Box onClick={() => onChange(value + 1)} ref={ref}>
    //   {name}:{value}
    // </Box>
    <Autocomplete
      multiple
      fullWidth
      size="small"
      options={options}
      disableCloseOnSelect
      isOptionEqualToValue={isOptionEqualToValue}
      getOptionLabel={getOptionLabel}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {getOptionLabel(option) || '-'}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          margin="normal"
          name={name}
          {...params}
          label="Filter by category"
          placeholder={placeholder}
          error={!!error}
          helperText={error?.message}
        />
      )}
      onChange={(event, value) => {
        onChange(value);
        externalOnChange?.(value);
      }}
      onBlur={onBlur}
      value={value}
      ref={ref}
    />
  );
}
