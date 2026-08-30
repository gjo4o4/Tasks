<!DOCTYPE html>
<html lang="en">
 
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AJAX概念和axios使用</title>
</head>
 
<body>
  <p class="my-p"></p>
  <script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  </script>
  <script>
    axios({
      url: 'http://hmajax.itheima.net/api/province'
    }).then(result => {
      console.log(result.data.list)
      console.log(result.data.list.join('<br>'))
      
      document.querySelector('.my-p').innerHTML = result.data.list.join('<br>')
    })
  </script>
</body>
 
</html>