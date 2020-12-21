import React, { useState } from 'react'
import ShopItemsTable from '../../Components/Tables/ShopItemsTable';
import Button from '../../Components/Common/Button';
import { makeStyles } from '@material-ui/core/styles';
import ShopItemForm from '../../Components/ShopItemForm';
import LoadingIndicator from '../Common/LoadingIndicator';
import ConfirmationDialog from '../Common/ConfirmationDialog';
import Container from "@material-ui/core/Container";


const useStyles = makeStyles((theme) => ({
    button: {
      margin: 'auto'
    },
  }));

const ShopDetails = (props) => {
  const { onSubmit, shop, isLoading, onDelete } = props;
  const classes = useStyles();

  const [currentSelectedItem, setCurrentSelectedItem] = useState(null);
  const [isItemsFormOpen, setIsItemsFormOpen] = useState(false);
  const [isConfirmationPopUpOpen, setIsConfirmationPopUpOpen] = useState(false);
  const [confirmationPopUpBody, setConfirmationPopUpBody] = useState('');
  const [deletableItem, setDeletableItem] = useState(null);


  const toggleItemForm = () => {
    setIsItemsFormOpen(!isItemsFormOpen);
  }

  const handleStoreItem = (item) => {
      setCurrentSelectedItem(null);
      toggleItemForm();
      onSubmit(item);
  }

  const handleOnEditItem = (item) => {
    setCurrentSelectedItem(item);
    toggleItemForm();
  }

  const handleDeleteItem = (item) => {
    setConfirmationPopUpBody(`Are you sure you want to delete shop item: ${item.name}?`);
    toggleConfigrmationPopUp();
    setDeletableItem(item);
    toggleConfigrmationPopUp();
}

const toggleConfigrmationPopUp = () => {
    setIsConfirmationPopUpOpen(!isConfirmationPopUpOpen);
}

const handleDeleteShopItemConfirmation = () => {
    toggleConfigrmationPopUp();
    onDelete(deletableItem);
}

  return (
    <Container maxWidth="lg">
        <h2>Shop Details</h2>
        <ShopItemsTable items={shop.items} {...props} onEdit={handleOnEditItem} onDelete={handleDeleteItem} />
        <div style={{display: 'flex'}}> 
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                style={{margin: 'auto', marginTop: 10}}
                onClick={handleOnEditItem}
            >
            Add New Shop Item
            </Button>
        </div>


        <ShopItemForm open={isItemsFormOpen} itemData={currentSelectedItem} onSubmit={handleStoreItem} onClose={toggleItemForm} />
        <LoadingIndicator open={isLoading}/>
        <ConfirmationDialog open={isConfirmationPopUpOpen} body={confirmationPopUpBody} confirmationButtonText="yes" cancelButtonText="no"
        onConfirmed={handleDeleteShopItemConfirmation} onCancel={toggleConfigrmationPopUp} title="Confirmation"/>
    </Container>

  )
}

export default ShopDetails