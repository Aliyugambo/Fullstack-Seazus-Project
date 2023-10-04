import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUrl } from '../../../../Actions/Url.actions';
import './CreateUrl.css';
import Alert from '../../../Alert/Alert'; 
import Loader from '../../../Loader/Loader';
const CreateURL = ()=>{

  const { message, error } = useSelector(state => state.createUrl);


  const [full, setFull] = useState('')
  const [urlName, setUrlName] = useState('')
 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_MESSAGES' });
      }, 0);
      navigate('/v/myUrls');
    }
    if (error) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ERRORS' });
      }, 5000);
    }
  }, [message, error])



  const handleSubmit = (e) => {
    e.preventDefault()
    const urlData = {};
    if (full) urlData.full = full;
    if (urlName) urlData.urlName = urlName;

    dispatch(createUrl(urlData));
  }


    return <div className='createURL page-container'>
    <div className="heading">
      <h3>Create URL</h3>
    </div>
    {
      error && <Alert type='error' text={error} />
    }
    <section className='create-url-upper'>
      <form action="" onSubmit={handleSubmit} className='createUrl-form'>
        <div className="form-component">
          <input type="url" name="full"  value={full} onChange={(e) => setFull(e.target.value)} id="" placeholder='Enter Long URL' />
        </div>
        <div className="form-component optional">
            <h4>Optional</h4>
          </div>
          <div className="form-component">
            <input type="text" name="urlName" value={urlName} onChange={(e) => setUrlName(e.target.value)} id="" placeholder='Enter Url Name (Optional)' />
          </div>
        <button>Create</button>
      </form>
    </section>
  </div>
}

export default CreateURL