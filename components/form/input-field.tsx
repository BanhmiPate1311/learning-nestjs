import { TextField, TextFieldProps } from '@mui/material';
import React, { ChangeEvent } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

export type InputFieldProps<T extends FieldValues> = TextFieldProps & {
  name: Path<T>; // Path<T>: phải truyền đúng key được khai báo ở interface
  control: Control<T>;
};

export function InputField<T extends FieldValues>({
  name,
  control,
  onChange: externalOnChange, // không cho user overide lại các thuộc tính này
  onBlur: externalOnBlur,
  ref: externalRef,
  value: externalValue,
  ...rest
}: InputFieldProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control });

  // render to UI: MUI, Ant Design, Bootstrap, Custom UI
  return (
    // <Box onClick={() => onChange(value + 1)} ref={ref}>
    //   {name}:{value}
    // </Box>
    <TextField
      fullWidth
      size="small"
      margin="normal"
      name={name}
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChange(event);
        externalOnChange?.(event);
      }}
      onBlur={onBlur}
      inputRef={ref}
      error={!!error}
      helperText={error?.message}
      {...rest}
    />
  );
}
