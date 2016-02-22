const ipcRenderer = require('electron').ipcRenderer;

function tplawesome(e,t) {
  res=e;
  for(var n=0; n<t.length; n++) { 
    res=res.replace(/\{\{(.*?)\}\}/g, function(e,r){
      return t[n][r]})}
    return res}

    $(function() {
      $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
        part: "snippet",
        type: "video",
        q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
        maxResults: 1,
        order: "relevance"
      }); 
       var isOnline = require('is-online');
       isOnline(function(err, online) {
        if (online){
                         // execute the request
                         request.execute(function(response) {
                          var results = response.result;
                          $("#results").html("");
                          $.each(results.items, function(index, item) {
                          $.get("tpl/item.html", function(data) {
                          $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
                          var link = "https://www.youtube.com/watch?v=" + item.id.videoId;
                          var title = item.snippet.title;

                          var str = document.getElementById("search").value;
                          str = str.replace(/\s/g, '');

                          ipcRenderer.send('download-message', link + " \"" + title.replace(/ /g,'') + "\" " + str +"song");
 

              });



                          });
                        });
                         resetVideoHeight();
                       
        } else {
          ipcRenderer.send('check-library');
          window.location = 'Library.html';
        }
                       console.log(online);
                     });
     });

      $(window).on("resize", resetVideoHeight);
    });

    function resetVideoHeight() {
      $(".video").css("height", $("#results").width() * 9/16);
    }

    function init() {
      gapi.client.setApiKey("AIzaSyAjXKpbYwL4CFbXVtNbLKKE9cOrlrsI05Q");
      gapi.client.load("youtube", "v3", function() {
        // yt api is ready
      });
    }