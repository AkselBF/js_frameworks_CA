import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button, TextField } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface CheckoutFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface CheckoutProps {
  clearCart: () => void; 
}

const schema = yup.object().shape({
  cardNumber: yup.string().required('Card number is required').matches(/^\d{16}$/, 'Invalid card number'),
  expiryDate: yup.string().required('Expiry date is required').matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Invalid expiry date'),
  cvv: yup.string().required('CVV is required').matches(/^\d{3,4}$/, 'Invalid CVV'),
});

const Checkout: React.FC<CheckoutProps> = ({ clearCart }) => { 
  const { control, handleSubmit, formState: { errors }, formState } = useForm<CheckoutFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<CheckoutFormData> = (data) => {
    console.log(data);
    clearCart();
  };

  const isButtonDisabled = !formState.isValid;

  return (
    <div className='px-3'>
      <h1 className='text-center text-3xl font-bold my-5'>Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} className='mb-6'>
          <Grid item xs={12}>
            <Controller
              name="cardNumber"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Card Number"
                  variant="outlined"
                  fullWidth
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="expiryDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Expiry Date"
                  variant="outlined"
                  fullWidth
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="cvv"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="CVV"
                  variant="outlined"
                  fullWidth
                  error={!!errors.cvv}
                  helperText={errors.cvv?.message}
                />
              )}
            />
          </Grid>
        </Grid>
        <div className='flex flex-col md:flex-row-reverse justify-between'>
          <Link to={formState.isValid ? "/checkout/success" : "#"} onClick={clearCart} className='cursor-default'>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isButtonDisabled}
              className={`py-3 px-6 rounded-md text-white font-semibold w-[200px] ${isButtonDisabled ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              Confirm Purchase
            </Button>
          </Link>
          <Link to="/">
            <button className='text-white bg-[#171717] py-1.5 w-[200px] rounded-md my-3 md:my-0'>Back to home</button>
          </Link>
        </div>
        
      </form>
    </div>
  );
};

export default Checkout;