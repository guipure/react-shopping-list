import { Container, CssBaseline, Typography } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import CategoryForm from './components/CategoryForm';
import Category from './components/Category';

const App = observer(({ store }) => {
  const onCategoryRemove = (id) => store.removeCategory(id);

  const price = (
    <Typography>Стоимость всех товаров в списке — {store.totalPrice} ₽</Typography>
  );

  return (
    <>
      <CssBaseline />
      <Container className="container">
        <Typography variant="h3" align="center">Список покупок</Typography>
        <CategoryForm store={store} />
        { store.categories.map((category) => (
          <Category
            key={category.id}
            category={category}
            onCategoryRemove={onCategoryRemove.bind(null, category.id)}
          />
        )) }
        { store.totalPrice ? price : null }
      </Container>
    </>
  );
})

export default App;
