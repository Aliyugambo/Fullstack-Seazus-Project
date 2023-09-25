import axios from 'axios'
// import { backendUrl } from '../utils/util';
// const backendUrl = 'https://shy-teal-worm-coat.cyclic.cloud';
// const backendUrl = 'http://localhost:4000';


export const getAnalytics = () => async(dispatch)=> {
    try {

    dispatch({
        type: 'GetAnalyticsRequest'
    })

    const {data} = await axios.get(`https://seazux-backend.onrender.com/api/analytics/getAll`, {
        withCredentials: true
    })

    dispatch({
        type: 'GetAnalyticsSuccess',
        payload: data
    })
        
    } catch (error) {
        dispatch({
            type: 'GetAnalyticsFailure',
            payload: error.response.data.message
        })
    }
}

export const getUrlAnalytics = (hash) => async(dispatch)=> {
    try {

    dispatch({
        type: 'GetUrlAnalyticsRequest'
    })


    const {data} = await axios.get(`https://seazux-backend.onrender.com/api/analytics/url/${hash}`, {
        withCredentials: true
    })

    dispatch({
        type: 'GetUrlAnalyticsSuccess',
        payload: data
    })
        
    } catch (error) {
        dispatch({
            type: 'GetUrlAnalyticsFailure',
            payload: error.response.data.error
        })
    }
}

export const getClicks = (hash, duration) => async(dispatch)=> {
    try{
        dispatch({
            type: 'GetClicksRequest'
        })

        let url = "";

        if(duration && hash){
            url = `https://seazux-backend.onrender.com/api/analytics/clicks?hash=${hash}&duration=${duration}`
        }
        if(duration && !hash){
            url = `https://seazux-backend.onrender.com/api/analytics/clicks?duration=${duration}`
        }
        if(!duration && hash){
            url = `https://seazux-backend.onrender.com/api/analytics/clicks?hash=${hash}`
        }
        if(!duration && !hash){
            url = `https://seazux-backend.onrender.com/api/analytics/clicks`
        }

        const {data} = await axios.get(url, {
            withCredentials: true
        })
        dispatch({
            type: 'GetClicksSuccess',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'GetClicksFailure',
            payload: error.response.data.message
        })
    }
}

// export const generateUrlReport = (hash) => async(dispatch)=> {
//     try{
//         dispatch({
//             type: 'GenerateUrlReportRequest'
//         })

//         const {data} = await axios.get(`http://localhost:4000/report/${hash}`, {
//             withCredentials: true
//         })

//         dispatch({
//             type: 'GenerateUrlReportSuccess',
//             payload: data
//         })
//     }
//     catch(error){
//         dispatch({
//             type: 'GenerateUrlReportFailure',
//             payload: error.response.data.message
//         })
//     }
// }