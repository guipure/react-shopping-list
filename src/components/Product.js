import { Checkbox, Hidden, IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Typography } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import React from 'react';

const Product = observer(({ product, onRemove }) => {
  const { title, price, bought, quantity } = product;

  const titleNode = <Typography variant="h5">{title}</Typography>;
  const priceNode = <Typography>{price * quantity} ₽</Typography>;
  const quantityNode = <Typography>{quantity} шт.</Typography>;

  return (
    <ListItem>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={bought}
          disableRipple
          onClick={() => product.toggle()}
        />
      </ListItemIcon>
      <ListItemText primary={titleNode} className={bought ? 'bought' : ''} />
      <div className="product-info">
        <Hidden xsDown>
          <ListItemText secondary={quantityNode} />
          <ListItemText secondary={priceNode} />
        </Hidden>
        <ListItemSecondaryAction>
          <IconButton color="secondary" onClick={onRemove}>
            <DeleteForever />
          </IconButton>
        </ListItemSecondaryAction>
      </div>
    </ListItem>
  );
});

export default Product;