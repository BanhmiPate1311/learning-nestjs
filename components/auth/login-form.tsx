import { Box, Button, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import { useForm } from 'react-hook-form';
import { InputField } from '../form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { useState } from 'react';
import { LoginPayLoad } from '@/models';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export interface LoginFormProps {
  onSubmit?: (payload: LoginPayLoad) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const schema = yup.object().shape({
    username: yup.string().required('Please enter your username').min(4, 'Username must be at least 4 character.'),
    password: yup.string().required('Please enter your password').min(6, 'Password must be at least 6 character.'),
  });
  const [showPassword, SetShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginPayLoad>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleLoginSubmit = async (payload: LoginPayLoad) => {
    await onSubmit?.(payload); // phải có await để sử dụng isSubmitting
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputField label="Username" name="username" control={control} />
      <InputField
        type={showPassword ? 'text' : 'password'}
        name="password"
        label="Password"
        control={control}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={() => SetShowPassword((x) => !x)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button
        disabled={isSubmitting}
        startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
        fullWidth
        sx={{ mt: 3 }}
        type="submit"
        variant="contained"
      >
        Login
      </Button>
    </Box>
  );
}
