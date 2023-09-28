import { WorkFiltersPayload } from '@/models';
import { Search } from '@mui/icons-material';
import { Box, InputAdornment, debounce } from '@mui/material';
import { useForm } from 'react-hook-form';
import { AutocompleteField, InputField } from '../form';
import { ChangeEvent } from 'react';
import { useTagList } from '@/hooks';

export interface WorkFiltersProps {
  initialValues?: WorkFiltersPayload;
  onSubmit?: (payload: WorkFiltersPayload) => void;
}

export function WorkFilters({ initialValues, onSubmit }: WorkFiltersProps) {
  //   const schema = yup.object().shape({});

  const { data } = useTagList({});
  const tagList = data?.data || [];

  const { control, handleSubmit } = useForm<WorkFiltersPayload>({
    defaultValues: {
      search: '',
      selectedTagList: [],
      ...initialValues,
    },
    // resolver: yupResolver(schema),
  });

  const handleLoginSubmit = async (payload: WorkFiltersPayload) => {
    console.log('form submit', payload);

    if (!payload) return;

    payload.tagList_like = payload.selectedTagList?.join('|') || '';
    delete payload.selectedTagList;
    await onSubmit?.(payload); // phải có await để sử dụng isSubmitting
  };

  const debounceSearchChange = debounce(handleSubmit(handleLoginSubmit), 350);

  return (
    <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputField
        placeholder="Search work by title"
        name="search"
        control={control}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          console.log('change', event.target.value);
          debounceSearchChange();
        }}
      />

      <AutocompleteField
        name="selectedTagList"
        label="filter by category"
        placeholder="Categories"
        control={control}
        options={tagList}
        getOptionLabel={(option) => option}
        isOptionEqualToValue={(option, value) => option === value}
        onChange={() => debounceSearchChange()}
      />
    </Box>
  );
}
