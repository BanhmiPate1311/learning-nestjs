import { DEFAULT_THUMBNAIL_URL } from '@/constants';
import { Box, FormHelperText, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { ChangeEvent, LegacyRef, useCallback, useEffect, useRef } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import ReactQuill, { ReactQuillProps } from 'react-quill';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });  // trả về function retry của react quill
interface ReactQuillWrapperProps extends ReactQuillProps {
  forwardedRef: LegacyRef<ReactQuill>;
}
const ReactQuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    const Component = ({ forwardedRef, ...props }: ReactQuillWrapperProps) => {
      return <RQ ref={forwardedRef} {...props} />;
    };
    return Component;
  },
  { ssr: false },
);
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

  const editorRef = useRef(null);
  // useEffect(() => {
  //   console.log({ editorRef });
  // }, []);
  const cloudinaryWidgetRef = useRef(null);

  useEffect(() => {
    function initCloudinaryWidget() {
      // check and retry if cloudynary not ready
      // @ts-ignore
      if (!window.cloudinary) {
        console.log('cloudinary not ready, retry in 500 ms');
        setTimeout(initCloudinaryWidget, 500);
        return;
      }
      console.log('cloudinary is ready');
      // @ts-ignore no type dè support yet
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: 'learning-nextjs',
          uploadPreset: 'learn-nextjs',
          // cropping: true, //add a cropping step
          // showAdvancedOptions: true,  //add advanced options (public_id and tag)
          // sources: [ "local", "url"], // restrict the upload sources to URL and local files
          multiple: false, //restrict upload to a single file
          // folder: "user_images", //upload files to the specified folder
          // tags: ["users", "profile"], //add the given tags to the uploaded files
          // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
          // clientAllowedFormats: ["images"], //restrict uploading to image files only
          maxImageFileSize: 2000000, //restrict file size to less than 2MB
          // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
          // theme: "purple", //change to a purple theme
        },

        // @ts-ignore notype support yet
        (error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Done! Here is the image info: ', result.info);
            const quill = editorRef.current;
            // @ts-ignore
            const range = quill?.getEditorSelection?.();
            console.log({ quill, range });
            if (quill && range) {
              // @ts-ignore
              quill.getEditor()?.insertEmbed?.(range.index, 'image', result.info?.secure_url);
            }
          }
        },
      );

      cloudinaryWidgetRef.current = widget;
    }

    initCloudinaryWidget();
  }, []);

  const imageHandler = useCallback(() => {
    console.log('select image click');
    // @ts-ignore
    if (cloudinaryWidgetRef.current) cloudinaryWidgetRef.current.open?.();
  }, []);

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
        image: imageHandler,
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

      <ReactQuillWrapper
        forwardedRef={editorRef}
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
