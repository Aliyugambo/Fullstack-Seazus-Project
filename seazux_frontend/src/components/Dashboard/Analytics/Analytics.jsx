import React from 'react';

import {useSelector} from 'react-redux';

// import {useNavigate} from 'react-router-dom';

import ContentLocked from '../DashboardPages/ContentLocked/ContentLocked';
// import pdfIcon from '../../../images/pdfIcon.png';

import './Analytics.css';

import ClickCards from './ClickCards/ClicksCards';
import GraphSection from './Graphs/GraphSection';
  

const Analytics = ({analytics, urlHash, groupId}) => {

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const {user} = useSelector(state => state.user);
  // const {reportUrl} = useSelector(state => state.reportUrl);

  return (

    <div className='analytics-page'>

      {
        user === false ?
        <ContentLocked heading={"Analytics Locked"}/>:

        <div className="div">

      <ClickCards analytics={analytics} />
    

      {
        urlHash ? <GraphSection analytics={analytics} urlHash={urlHash}/>:
        <GraphSection analytics={analytics} />
      }
      </div>

    }
    
    </div>
  )
}

export default Analytics