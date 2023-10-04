import { useTagList } from '@/hooks';
import { WorkPayload } from '@/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button } from '@mui/material';
import { Resolver, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { AutocompleteField, EditorField, InputField, PhotoField } from '../form';
import React, { useState } from 'react';

export interface WorkFormProps {
  initialValues?: Partial<WorkPayload>;
  onSubmit?: (payload: FormData) => void;
}

export function WorkForm({ initialValues, onSubmit }: WorkFormProps) {
  const schema = yup.object().shape({
    title: yup.string().required('Please enter your work title'),
    shortDescription: yup.string().required('Please enter your work description'),
    tagList: yup.array().of(yup.string()).min(1, 'Please select atleast one category'),
    thumbnail: yup
      .object()
      .nullable()
      .test('test-required', 'Maximum size exceeded. Please select another file.', (value: any, context) => {
        // require when add
        // optional when edit
        if (Boolean(initialValues?.id) || Boolean(value?.file)) return true;
        // return context.createError({ message: 'Please select an image' });
        return false;
      })
      .test('test-size', 'Maximum size exceeded. Please select another file.', (value: any) => {
        // limit size to 3MB
        console.log('test size', value);
        const fileSize = value?.file?.['size'] || 0;
        const MB_TO_BYTES = 1024 * 1024;
        const MAX_SIZE = 3 * MB_TO_BYTES; // 3MB
        return fileSize <= MAX_SIZE;
      }),
  });

  const { data } = useTagList({});
  const tagList = data?.data || [];

  const { control, handleSubmit } = useForm<Partial<WorkPayload>>({
    defaultValues: {
      title: '', // nếu không đặt defaul value sẽ bị báo lỗi component chuyển từ uncontroll sang controlled
      shortDescription: '',
      tagList: [],
      thumbnail: initialValues?.id
        ? {
            file: null,
            previewUrl: initialValues.thumbnailUrl,
          }
        : null,
      fullDescription: '',
      ...initialValues,
    },
    resolver: yupResolver(schema) as Resolver<Partial<WorkPayload>, any>,
  });

  const handleLoginSubmit = async (formValues: Partial<WorkPayload>) => {
    if (!formValues) return;
    const payload = new FormData();

    // id
    if (formValues.id) {
      payload.set('id', formValues.id);
    }

    // thumbnail
    if (formValues.thumbnail?.file) {
      payload.set('thumbnail', formValues.thumbnail?.file);
    }

    // tagList
    formValues.tagList?.forEach((tag) => {
      payload.append('tagList', tag);
    });

    // title, short description, full description
    const keyList: Array<keyof Partial<WorkPayload>> = ['title', 'shortDescription', 'fullDescription'];
    keyList.forEach((name) => {
      if (initialValues?.[name] !== formValues[name]) {
        payload.set(name, formValues[name] as string);
      }
    });

    console.log('form submit: ', formValues);

    await onSubmit?.(payload);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputField name="title" label="Title" placeholder="Your Work Title" control={control} />

      <InputField
        name="shortDescription"
        label="Short description"
        placeholder="Your work description"
        control={control}
        InputProps={{
          multiline: true,
          rows: 3,
        }}
      />

      <AutocompleteField
        name="tagList"
        label="Categoríe"
        control={control}
        options={tagList}
        getOptionLabel={(option) => option}
        isOptionEqualToValue={(option, value) => option === value}
      />

      <PhotoField name="thumbnail" control={control} label="Thumbnail" />
      <EditorField name="fullDescription" control={control} label="Full Description" />

      <Button variant="contained" type="submit">
        {initialValues?.id ? 'Save' : 'Submit'}
      </Button>
    </Box>
  );
}
