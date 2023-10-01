import { DEFAULT_THUMBNAIL_URL } from '@/constants';
import { Box, FormHelperText, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { ChangeEvent } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// dynamic xử lý lỗi document is not defined
export type EditorFieldProps<T extends FieldValues> = {
  name: Path<T>; // Path<T>: phải truyền đúng key được khai báo ở interface
  control: Control<T>;
  label?: string;
};

export function EditorField<T extends FieldValues>({ name, control, label }: EditorFieldProps<T>) {
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({ name, control });

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        [{ color: [] }, { background: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        // image: imageHandler,
      },
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'background',
  ];

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

      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={value}
        onChange={(content) => onChange(content)}
      />

      <FormHelperText error={!!error}>{error?.message}</FormHelperText>
    </Box>
  );
}
