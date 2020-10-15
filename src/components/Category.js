import { Button, Card, CardContent, CardHeader, Hidden, List } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Product from './Product';
import ProductForm from './ProductForm';

const Category = observer(({ category, onCategoryRemove }) => {
  const { title, products, price } = category;

  const onProductRemove = (id) => category.removeProduct(id);

  return (
    <Card className="card">
      <CardHeader
        title={title}
        subheader={price ? `на сумму ${price} ₽` : 'нет товаров этой категории'}
        action={
          <Button
            variant="outlined"
            color="secondary"
            endIcon={<Close />}
            onClick={onCategoryRemove}
          >
            <Hidden xsDown>Удалить категорию</Hidden>
          </Button>
        }
      />        
      <CardContent>
        <ProductForm category={category} />
        <List>
          { products.map((product) => (
            <Product
              product={product}
              key={product.id}
              onRemove={onProductRemove.bind(null, product.id)}
            />
          )) }
        </List>
      </CardContent>
    </Card>
  );
});

export default Category;