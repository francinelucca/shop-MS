import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '../Common/Button';


const ShopForm = (props) => {
  const { onClose, onSubmit, shopData, open } = props;
  
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [address, setAddress] = useState('');
  const [rnc, setRnc] = useState('');
  const [id, setId] = useState(null);
  
  useEffect(
      () => {
        getInitialValues(shopData)
      },
      [shopData]
  )


  const getInitialValues = (data) => {
    if(data){
        setName(data.name || '');
        setOwner(data.owner || '');
        setAddress(data.address || '');
        setRnc(data.rnc || '');
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
        owner,
        address,
        rnc
      });
      event.preventDefault();
  }

  const myChangeHandler = (fnSet) => (event) =>{
    let val = event.target.value;
    fnSet(val);
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} style={{minWidth: 450}}>
      <DialogTitle id="simple-dialog-title">{shopData && shopData._id ? 'Edit Shop Info' : 'Create Shop'}</DialogTitle>
      <div style={{minWidth: 450, paddingBottom: 10}}>
        <FormControl style={{maxWidth:300, margin: 'auto', display: 'flex'}}>
            <TextField label="Name" value={name} onChange={myChangeHandler(setName)}/>
            <TextField label="Owner" value={owner} onChange={myChangeHandler(setOwner)}/>
            <TextField label="Address" value={address} onChange={myChangeHandler(setAddress)}/>
            <TextField label="RNC" value={rnc} onChange={myChangeHandler(setRnc)}/>
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
  shopData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired
};


export default ShopForm;