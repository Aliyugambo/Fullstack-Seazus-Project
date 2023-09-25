import React from "react";

import './Dashboard.css';

import SideNavbar from './SideNavbar/SideNavbar';
import DashboardHome from './DashboardPages/DashboardHome/DashboardHome';
import MyURLs from './DashboardPages/MyURLs/MyURLs';
import Profile from './DashboardPages/Profile/Profile';
import CreateURL from './DashboardPages/CreateUrl/CreateUrl'
import InvitePeople from './DashboardPages/InvitePeople/InvitePeople'
// import ContentLocked from './DashboardPages/ContentLocked/ContentLocked'
import ViewURL from './DashboardPages/ViewURL/ViewURL'
import EditUrl from './DashboardPages/EditUrl/EditUrl'
const Dashboard = ({page})=>{

    return <div className="dashboard">
         <section className='sideNavbar-section'>
        <SideNavbar />
      </section>

      <section className='mainContent-section'>
          
               {
                 page==='dashboard-home' ? <DashboardHome /> :
                 page==='profile' ? <Profile /> : 
                 page==='myUrls' ? <MyURLs /> :
                 page==='invite-people' ? <InvitePeople /> :
                 page==='createUrl' ? <CreateURL /> :
                 page==='viewUrl' ? <ViewURL /> :
                 page==='editUrl' ? <EditUrl /> :
                //  page==='content-locked' ? <ContentLocked/> :
                 <h1>404</h1>
               }
      </section>
    </div>
}

export default Dashboard