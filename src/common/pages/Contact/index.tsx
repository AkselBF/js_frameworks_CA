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
  fullName: yup.string().required('Full name is required').min(3, 'Full name must be at least 3 characters'),
  subject: yup.string().required('Subject is required').min(3, 'Subject must be at least 3 characters'),
  email: yup.string().email('Invalid email address').required('Email is required').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'invalid email address'),
  body: yup.string().required('Body is required').min(3, 'Body must be at least 3 characters'),
});

const Contact: React.FC = () => {
  const { control, handleSubmit, formState: { errors, isValid, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    console.log(data);
    reset();
  };

  const isButtonDisabled = !isValid || isSubmitting;

  return (
    <div className='px-3'>
      <h1 className="text-center text-3xl font-bold my-5 underline">Contact us</h1>
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
                  sx={{ height: 64, marginBottom: 1 }}
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
                  sx={{ height: 64, marginBottom: 1 }}
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
                  sx={{ height: 64, marginBottom: 1 }}
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
                  sx={{ height: 64, marginBottom: 10 }}
                />
              )}
            />
          </Grid>
        </Grid>
        <div className='flex flex-col md:flex-row-reverse justify-between'>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isButtonDisabled}
            className={`py-3 px-6 rounded-md text-white font-semibold w-[200px] ${isButtonDisabled ? 'bg-gray-400' : 'bg-[#00B2FF] hover:bg-blue-600'}`}
          >
            Submit
          </Button>
          <Link to="/">
            <button className='text-white bg-[#171717] py-1.5 w-[200px] rounded-md my-3 md:my-0'>Back to home</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Contact;