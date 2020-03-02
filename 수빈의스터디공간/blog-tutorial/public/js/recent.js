// fetch recent posts:
(function(){
  Mustache.tags = ["<%", "%>"] // change delimiter so it doesn't conflict server side

  $.ajax({
    url: '/api/post?limit=3',
    type: 'GET',
    data: null,
    success: function(resp){
      if (resp.confirmation != 'success')
        return

      const recent = resp.data

      var recentHtml = ''
      var tpl = $('#tpl-recent-post').html()
      recent.forEach(function(post){
        recentHtml += Mustache.render(tpl, post)
      })

      console.log('RECENT: ' + recentHtml)
      $('#recent-posts').html(recentHtml)
    },
    error: function(err){

    }
  })
})()
