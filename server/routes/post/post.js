var express = require('express');
var router = express.Router();
var { upload } = require('./upload');
// const { isLoggedIn } = require('./middlewares'); 

/* post router listing. */
router.post('/', function(req, res, next) {
  res.send('here is post router');
});

router.post('/', function(req, res, next) {
  res.send('here is post router');
});

router.post('/', function(req, res, next) {
  res.send('here is post router');
});

router.post('/', function(req, res, next) {
  res.send('here is post router');
});

//사진 한장~! , 
router.post('/', upload.single('post'), async (req, res, next) => {
  try {
    console.log('유저 포스트 업로드', req.user.id);  //req.body.content
    const post = await Post.create({
      content: 'test',
      img: req.file.location,
      UserId: req.user.id,
    });
    //해쉬태그 
    // const hashtags = req.body.content.match(/#[^\s#]*/g);
    // if (hashtags) {
    //   const result = await Promise.all(
    //     hashtags.map(tag => {
    //       return Hashtag.findOrCreate({
    //         where: { title: tag.slice(1).toLowerCase() },
    //       })
    //     }),
    //   );
    //   await post.addHashtags(result.map(r => r[0]));
    // }
    if(post){
      return res.status(200).json({
        status: true,
        message: 'Post Success',
      }); 
    }else{
      return res.status(200).json({
        status: false,
        message: 'Post fail',
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
