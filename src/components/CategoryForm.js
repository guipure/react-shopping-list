import { TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

const CategoryForm = observer(({ store }) => {
  const [title, setTitle] = useState('');

  const onChange = (event) => setTitle(event.target.value);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!title) return;

    store.addCategory(title);  
    setTitle('');
  }

  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Введите категорию товара"
        fullWidth
        onChange={onChange}
        value={title}
      />
    </form>
  );
});

export default CategoryForm;