import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, TextField } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface ContactFormData {
  fullName: string;
  subject: string;
  email: string;
  body: string;
}

const schema = yup.object().shape({
  fullName: yup.string().min(3, 'Full name must be at least 3 characters').required('Full name is required'),
  subject: yup.string().min(3, 'Subject must be at least 3 characters').required('Subject is required'),
  email: yup.string().email('Invalid email address').required('Email is required').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'invalid email address'),
  body: yup.string().min(3, 'Body must be at least 3 characters').required('Body is required'),
});

const Contact: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, formState } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    console.log(data);
    // Handle form submission
  };

  const isButtonDisabled = !formState.isValid;

  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-5">Contact us</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} className='mb-6'>
          <Grid item xs={12}>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="subject"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Subject"
                  variant="outlined"
                  fullWidth
                  error={!!errors.subject}
                  helperText={errors.subject?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="body"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Body"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!errors.body}
                  helperText={errors.body?.message}
                />
              )}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isButtonDisabled}
          className={`py-3 px-6 rounded-md text-white font-semibold ${isButtonDisabled ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          Submit
        </Button>
      </form>
      <Link to="/">
        <button className='text-white my-6 bg-[#171717] py-1.5 w-[86px] rounded-md'>Home</button>
      </Link>
    </div>
  );
};

export default Contact;