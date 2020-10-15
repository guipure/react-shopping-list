import { Button, Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

const ProductForm = observer(({ category }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);

  const onTitleChange = (event) => setTitle(event.target.value);
  const onPriceChange = (event) => {
    if (isNaN(Number(event.target.value))) return;
    setPrice(event.target.value);
  };

  const onQuantityIncrement = () => setQuantity(quantity + 1);
  const onQuantityDecrement = () => quantity < 2 ? setQuantity(1) : setQuantity(quantity - 1);

  const onSubmit = (event) => {
    event.preventDefault();
    
    if (!title) return;

    category.addProduct(title, Number(price), quantity);
    setTitle('');
    setPrice('');
    setQuantity(1);
  }

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Название"
            onChange={onTitleChange}
            value={title}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Цена"
            onChange={onPriceChange}
            value={price}
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">₽</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <div className="quantity-controls">
            <Button
              variant="outlined"
              size="small"
              onClick={onQuantityDecrement}
              disabled={quantity < 2}
            >-</Button>
            <Typography>{quantity} шт.</Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={onQuantityIncrement}
            >+</Button>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            type="submit"
            fullWidth
          >
            Добавить товар
          </Button>
        </Grid>
      </Grid>
    </form>
  );
});

export default ProductForm;