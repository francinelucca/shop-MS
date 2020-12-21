import React, { useState } from 'react'
import ShopsTableComponent from '../../Components/Tables/ShopsTable';
import Button from '../../Components/Common/Button';
import { makeStyles } from '@material-ui/core/styles';
import ShopForm from '../../Components/ShopForm';
import LoadingIndicator from '../../Components/Common/LoadingIndicator';
import ConfirmationDialog from '../Common/ConfirmationDialog';
import Container from "@material-ui/core/Container";


const useStyles = makeStyles((theme) => ({
    button: {
      margin: 'auto'
    },
  }));

const Shops = (props) => {
  const {isLoading, shops, onDelete, onView, onSubmit} = props;
  const classes = useStyles();

  const [currentSelectedShop, setCurrentSelectedShop] = useState(null);
  const [isShopFormOpen, setIsShopFormOpen] = useState(false);
  const [isConfirmationPopUpOpen, setIsConfirmationPopUpOpen] = useState(false);
  const [confirmationPopUpBody, setConfirmationPopUpBody] = useState('');
  const [deletableShop, setDeletableShop] = useState(null);


  const toggleShopForm = () => {
      setIsShopFormOpen(!isShopFormOpen);
  }

  const handleOnEditShop = (shop) => {
    setCurrentSelectedShop(shop);
    toggleShopForm();
  }

  const handleStoreShop = (shop) => {
    setCurrentSelectedShop(null);
    toggleShopForm();
    onSubmit(shop);
}

    const handleDeleteShop = (shop) => {
        setConfirmationPopUpBody(`Are you sure you want to delete shop: ${shop.name}?`);
        toggleConfigrmationPopUp();
        setDeletableShop(shop);
        toggleConfigrmationPopUp();
    }

    const toggleConfigrmationPopUp = () => {
        setIsConfirmationPopUpOpen(!isConfirmationPopUpOpen);
    }

    const handleDeleteShopConfirmation = () => {
        toggleConfigrmationPopUp();
        onDelete(deletableShop);
    }


  return (
    <Container maxWidth="lg">
    <h2>Registered Shops</h2>
    <ShopsTableComponent shops={shops} onEdit={handleOnEditShop} onDelete={handleDeleteShop} onView={onView} />
    <div style={{display: 'flex'}}> 
        <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            style={{margin: 'auto', marginTop: 10}}
            onClick={handleOnEditShop}
        >
        Register New Shop
        </Button>
    </div>


    <ShopForm open={isShopFormOpen} shopData={currentSelectedShop} onSubmit={handleStoreShop} onClose={toggleShopForm} />
    <LoadingIndicator  open={isLoading}/>
    <ConfirmationDialog open={isConfirmationPopUpOpen} body={confirmationPopUpBody} confirmationButtonText="yes" cancelButtonText="no"
    onConfirmed={handleDeleteShopConfirmation} onCancel={toggleConfigrmationPopUp} title="Confirmation"/>

     </Container>

  )
}

export default Shops