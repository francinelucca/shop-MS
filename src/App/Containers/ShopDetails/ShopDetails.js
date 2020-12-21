import React, { useState, useEffect } from 'react'
import ShopDetailsComponent from '../../Components/ShopDetails';
import Api from '../../Core/Api';
import { useParams } from "react-router-dom";
import ErrorAlert from '../../Components/Common/Alerts/ErrorAlert';
import Container from "@material-ui/core/Container";


const ShopDetails = () => {
  let { id } = useParams();
  const [shop, setShop] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    fetchShop();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps
 
  const fetchShop = () => {
      setIsLoading(true);
      Api.GetStore(id).then(
          (res) => {
              if(res.data.success){
                  setShop(res.data.data);
              }
              else{
                showError('An error occured while attempting to retrieve shop information.');
              }
          }
      ).catch(
          err => {
            showError(err);
          }
      ).finally(
        () =>  setIsLoading(false)
      )
  }

  const handleStoreItem = (itemInfo) => {
      setIsLoading(true)
      const {id} = itemInfo;
      if(id){
        Api.EditItem(shop._id, id, itemInfo).then(
            res => {
                if(res.data.success){
                    fetchShop();
                }else{
                    showError('An error occured while attempting to update shop item information.');
                }
            }
        ).catch(
            err => {
                showError(err);
            }
        ).finally(
            () =>  setIsLoading(false)
          );
      }else{
        Api.CreateItem(shop._id, itemInfo).then(
            res => {
                if(res.data.success){
                    fetchShop();
                }else{
                    showError('An error occured while attempting to create shop item.');
                }
            }
        ).catch(
            err => {
                showError(err);
            }
        ).finally(
            () =>  setIsLoading(false)
          )
      }
  }

  const handleOnDeleteItem = (item) => {
    const {_id} = item;
    Api.DeleteItem(shop._id, _id).then(
        res => {
            if(res.data.success){
                fetchShop();
            }else{
                showError('An error occured while attempting to delete shop item.');
            }
        }
    ).catch(
        (err) => {
            showError(err);
        }
    )
  }

  const showError = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => {
        setErrorMessage('');
    }, 5000);
}

  return (
      <React.Fragment>
        { errorMessage && <ErrorAlert message={errorMessage}/> }
        <ShopDetailsComponent shop={shop} onDelete={handleOnDeleteItem} onSubmit={handleStoreItem} isLoading={isLoading} />
      </React.Fragment>
     )
}

export default ShopDetails