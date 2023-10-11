const Url = require('../models/Url');
const User = require('../models/User');
const Analytics = require('../models/Analytics');
const DeviceDetector = require('node-device-detector');


const detector = new DeviceDetector({
    clientIndexes: true,
    deviceIndexes: true,
    deviceAliasCode: false,
});
////////////////////////////////////////////GET URLS ////////////////////////////////////////////////////////////////////////////////////

// GENERATE URL HASH CODE
async function genrateUrlCode() {
  try {

      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let urlId = '';

      const genrateUrlHash = () => {

          const charactersLength = characters.length;
          for (let i = 0; i < 7; i++) {
              urlId += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
      }
      genrateUrlHash();

      const checkUrlId = await Url.findOne({ hash: urlId });

      while (checkUrlId) {
          genrateUrlHash();
      }

      return urlId;
  }
  catch (error) {
      console.log(error);
      return false;
  }
}

// SHORT URL FOR UNAUTORIZED USERS
async function anony_short(req, res){
  const full = req.body.full;

  const urlId = await genrateUrlCode();

  if(!urlId){
      return res.status(400).json({
          success: false,
          error: "Something went wrong, please try again."
      })
  }

  console.log(urlId);

  const url = await Url.create({
      longUrl: full,
      hash: urlId,
      shortUrl: `${req.protocol}://${req.get("host")}/${urlId}`,
  })

  res.status(200).json({
    urlId
  })
} 


// GREATE SHORT URLS
async function login_short(req, res){
    try {

        const full = req.body.full;
        if (!full) {
            return res.status(400).json({
                success: false,
                error: "Please enter original url"
            })
        }

        const user = req.user;

        const hash = await genrateUrlCode();

        const url = await Url.create({
            longUrl: full,
            shortUrl: `${req.protocol}://${req.get("host")}/${hash}`,
            hash,
            owner: user._id,
            createdAt: Date.now()
        })

        if (req.body.urlName) url.urlName = req.body.urlName;
        if (req.body.captcha) url.captcha = true;

        const analytic = await Analytics.create({
            url: url._id,
            user: user._id,
            urlHash: url.hash,
            createdAt: Date.now()
        })

        url.analytics = analytic._id;
        await url.save();

        user.urls.push(url._id);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Url created successfully",
            url
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

  
// HANDLE URL REDIRECTIONS
async function handleRedirect(req, res){
    try {
        const hash = req.params.hash;

        if(!hash || hash.length===0){
            return res.redirect('https://seazux.onrender.com/v/home');
        }

        const url = await Url.findOne({ hash });
        if (url) {

            // annonymous url
            if(!url.owner){
                return res.redirect(url.longUrl);
            }


            const analytic = await Analytics.findById(url.analytics);
            analytic.clicks.push(Date.now());

            if (req.headers['user-agent']) {
                const userAgent = req.headers['user-agent'];
                // console.log(req.headers);

                const result = detector.detect(userAgent);

                // console.log(result);

                analytic.os.push(result.os.name);
                
                analytic.browsers.push(result.client.name);
                analytic.devices.push(result.device.type);

                // const device = deviceDetector.parse(userAgent);
                // analytic.devices.push(device.device.type);
                // analytic.browsers.push(device.client.name);
                // analytic.os.push(device.os.name);
            }

            if (req.headers['referer']) {
                const referer = req.headers['referer'];
                // console.log(referer)

                // const country = await getCountry(referer);

                // const country = await getCountry(referer);
                // analytic.countries.push(country);
            }
            await analytic.save();


            if (url.password) {
                return res.redirect(`${req.protocol}://${req.get("host")}/protected/${hash}`);
            }

            return res.redirect(url.longUrl);
        }

        res.status(404).json({
            error: 'Url not found'
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
} 

const pageLimit = 6;
async function getMyUrl(req, res){

    try {
        const user = req.user;
        let { page } = req.query;
        if(!page) page = 1;

        let search = req.query.search;
        if(!req.query.search || req.query.search === 'null'){
            search = '';
        }

        if(user.urls.length===0){
            return res.status(200).json({
                success: true,
                message: "Urls fetched successfully",
                urls: [],
                pageCount: 0,
            });
        } 

        const urlsData = await Url.aggregate([
            {
                $match: {
                    owner: user._id,
                    $or: [{urlName: { $regex: search, $options: 'i' }}, {hash: { $regex: search, $options: 'i' }}, {longUrl: { $regex: search, $options: 'i' }}]
                }
            },
            {$sort: {createdAt: -1}},
            { '$facet'    : {
                // "info": [ { $count: "total" }, { $addFields: { page: Number(page) } } ],
                "urls": [ { $skip:  (page-1)*pageLimit}, { $limit: pageLimit } ] 
            } }
        ])

        const totalUrl = await Url.countDocuments({owner: user._id});

        res.status(200).json({
            success: true,
            message: "Urls fetched successfully",
            urls: urlsData[0].urls,
            pageCount: Math.ceil(totalUrl/pageLimit),
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}


// ViewMy Urls
async function viewUrl(req, res){
    try{

        const { hash } = req.params;
        const user = req.user;

        const url = await Url.findOne({ hash, owner: user._id }).populate('analytics');
        if(!url){
            return res.status(404).json({
                success: false,
                error: "Url not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Url fetched successfully",
            url
        })

    }
    catch(error){
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}


// EditUrl
async function editUrl(req,res){
        try{

            const url = await Url.findOne({hash:req.params.hash});
            if(!url){
                return res.status(404).json({
                    success: false,
                    error: "Url Not Found"
                })
            }
            if(toString(req.user._id)!==toString(url.owner)){
                return res.status(404).json({
                    success: false,
                    error: "Url Not Found"
                })
            }
            const {urlName,captcha,customUrl} = req.body.urlData;
    
            if(customUrl && customUrl!==url.hash){
                const searchHash = await Url.findOne({hash:customUrl});
                if(searchHash){
                    return res.status(400).json({
                        success:false,
                        error: "This cutome url is not available, try another."
                    })
                }
                // Updating the url hash in analytics of url
                const urlAnalytic = await Analytics.findOne({urlHash: url.hash});
                urlAnalytic.urlHash = customUrl;
                await urlAnalytic.save();
    
                url.customHash = true;
                url.hash = customUrl;
                url.shortUrl = `${req.protocol}://${req.get("host")}/${customUrl}`
            }
    
            if(urlName) url.urlName = urlName;
    
            if(captcha){
                url.captcha = true;
            }
            else{
                url.captcha = false;
            }
            await url.save();
    
            res.status(201).json({
                success: true,
                message: "Url updated successfuly",
                url
            })
        }
        catch(error){
            res.status(500).json({
                success: false,
                error: error.message
            })
        }
}

// DeleteUrl
async function deleteUrl(req, res){
    try{

        const { hash } = req.params;
        if(!hash) return res.status(400).json({
            success: false,
            error: "Hash is required"
        })
        const user = req.user;

        const url = await Url.findOne({ hash, owner: user._id });
        if(!url){
            return res.status(404).json({
                success: false,
                error: "Url not found"
            })
        }

        const analytic = await Analytics.findOne({urlHash: hash});
        if(analytic){
            await analytic.remove();
        }

        user.urls = user.urls.filter(curr => curr.toString() !== url._id.toString());
        await user.save();

        await url.remove();

        res.status(200).json({
            success: true,
            message: "Url deleted successfully"
        })
    }
    catch(error){
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

//   const UrlFunc = {login_short,handleRedirect,getMyUrl,anony_short,viewUrl,editUrl,deleteUrl}


  module.exports = {
    login_short,
    handleRedirect,
    getMyUrl,
    anony_short,
    viewUrl,
    editUrl,
    deleteUrl
  }