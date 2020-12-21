import React, { useState, useEffect } from 'react'
import ShopsComponent from '../../Components/Shops';
import Api from '../../Core/Api';
import { useHistory } from "react-router-dom";
import ErrorAlert from '../../Components/Common/Alerts/ErrorAlert';

const Shops = () => {

  const history = useHistory();
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchShops();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchShops = () => {
      setIsLoading(true);
      Api.GetStores().then(
          (res) => {
              if(res.data.success){
                  setShops(res.data.data);
              }
              else{
                showError('An error occured while attempting to retrieve shops information.');
              }
          }
      ).catch(
          err => {
            showError(err);
          }
      ).finally(
          () => setIsLoading(false)
      )
  }

  const handleStoreShop = (storeInfo) => {
      setIsLoading(true);
      const {id} = storeInfo;
      if(id){
        Api.EditStore(id, storeInfo).then(
            res => {
                if(res.data.success){
                    fetchShops();
                }else{
                    showError('An error occured while attempting to update shop information');
                }
            }
        ).catch(
            err => {
                showError(err);
            }
        ).finally(
            () => setIsLoading(false)
        );
      }else{
        Api.CreateStore(storeInfo).then(
            res => {
                if(res.data.success){
                    fetchShops();
                }else{
                    showError('An error occured while attempting to create shop');
                }
            }
        ).catch(
            err => {
                showError(err);
            }
        ).finally(
            () => setIsLoading(false)
        )
      }
  }

  const handleonDeleteShop = (shop) => {
    setIsLoading(true);
    const {_id} = shop;
    Api.DeleteStore(_id).then(
        res => {
            if(res.data.success){
                fetchShops();
            }else{
                showError('An error occured while attempting to delete shop.');
            }
        }
    ).catch(
        (err) => {
            showError(err);
        }
    ).finally(
        () => setIsLoading(false)
    )
  }

  const handleOnViewShop = (shop) => {
    history.push(`/stores/${shop._id}`);
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
        <ShopsComponent isLoading={isLoading} shops={shops} onDelete={handleonDeleteShop} onView={handleOnViewShop} onSubmit={handleStoreShop} />
    </React.Fragment>
  )
}

export default Shops;