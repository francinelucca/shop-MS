import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '../Common/Button';


const ShopForm = (props) => {
  const { onClose, onSubmit, itemData, open } = props;
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [availability, setAvailability] = useState('');
  const [id, setId] = useState(null);
  
  useEffect(
      () => {
        getInitialValues(itemData)
      },
      [itemData]
  )


  const getInitialValues = (data) => {
    if(data){
        setName(data.name || '');
        setValue(data.value || '');
        setAvailability(data.availability || '');
        setDescription(data.description || '');
        setId(data._id);
    }
  }

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (event) => {
      onSubmit({
        id,
        name,
        value,
        description,
        availability
      });
      event.preventDefault();
  }

  const myChangeHandler = (fnSet) => (event) =>{
    let val = event.target.value;
    fnSet(val);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} style={{minWidth: 450}}>
      <DialogTitle id="simple-dialog-title">{itemData && itemData._id ? 'Edit Shop Item Info' : 'Create Shop Item'}</DialogTitle>
      <div style={{minWidth: 450, paddingBottom: 10}}>
        <FormControl style={{maxWidth:300, margin: 'auto', display: 'flex'}}>
            <TextField label="Name" value={name} onChange={myChangeHandler(setName)}/>
            <TextField label="Description" value={description} onChange={myChangeHandler(setDescription)}/>
            <TextField label="Value" value={value} onChange={myChangeHandler(setValue)}/>
            <TextField label="Availability" value={availability} onChange={myChangeHandler(setAvailability)}/>
            <Button variant="contained"
                    color="primary"
                    onClick={handleSubmit}
            >
            Submit
            </Button>
        </FormControl>
      </div>
    </Dialog>
  );
}

ShopForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  itemData: PropTypes.object
};


export default ShopForm;