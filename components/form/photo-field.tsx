import { DEFAULT_THUMBNAIL_URL } from '@/constants';
import { Box, FormHelperText, Typography } from '@mui/material';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

export type PhotoFieldProps<T extends FieldValues> = {
  name: Path<T>; // Path<T>: phải truyền đúng key được khai báo ở interface
  control: Control<T>;
  label?: string;
};

export function PhotoField<T extends FieldValues>({ name, control, label }: PhotoFieldProps<T>) {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({ name, control });

  function handleFilechange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    onChange({
      file,
      previewUrl: url,
    });
  }

  // value data type
  // - null | {file:File, previewUrl: string}
  const previewUrl = value?.['previewUrl'] || DEFAULT_THUMBNAIL_URL;
  const inputId = `photo-field-${name}`;

  // render to UI: MUI, Ant Design, Bootstrap, Custom UI
  return (
    <Box my={1.5}>
      <Typography variant="body2">{label}</Typography>
      <Box component="label" htmlFor={inputId} sx={{ cursor: 'pointer' }}>
        <Image src={previewUrl} width={246} height={180} alt="work thumbnail" priority={true} ref={ref} />
      </Box>
      <FormHelperText error={!!error}>{error?.message}</FormHelperText>
      <Box id={inputId} component="input" type="file" accept="image/*" onChange={handleFilechange} hidden></Box>
    </Box>
  );
}
