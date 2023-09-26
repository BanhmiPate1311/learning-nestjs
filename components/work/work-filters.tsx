import { WorkFiltersPayload } from '@/models';
import { Search } from '@mui/icons-material';
import { Box, InputAdornment, debounce } from '@mui/material';
import { useForm } from 'react-hook-form';
import { InputField } from '../form';
import { ChangeEvent } from 'react';

export interface WorkFiltersProps {
  onSubmit?: (payload: WorkFiltersPayload) => void;
}

export function WorkFilters({ onSubmit }: WorkFiltersProps) {
  //   const schema = yup.object().shape({});
  const { control, handleSubmit } = useForm<WorkFiltersPayload>({
    defaultValues: {
      search: '',
    },
    // resolver: yupResolver(schema),
  });

  const handleLoginSubmit = async (payload: WorkFiltersPayload) => {
    console.log('form submit', payload);
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
    </Box>
  );
}
