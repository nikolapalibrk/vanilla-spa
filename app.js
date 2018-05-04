(function () {
   var routes = {},
       el = document.getElementById('view');

   function render(url) {
      el.innerHTML = 'Loading...';
      fetch(url).then(response=>{
         return response.json();
      }).then(data => {
         let beers = data;
         var template = document.getElementById('home').innerHTML;
         var compiledTemplate = Handlebars.compile(template);
         el.innerHTML = compiledTemplate({data: beers});
      }).catch(error => {
         el.innerHTML = 'Server is unavailable, please try later.'
      })
   }

   function route (path, controller) {
      routes[path] = {controller};
   }

   function router () {
      var url = location.hash.slice(1) || '/';
      var route = routes[url];
      route.controller();
   }

   route('/', function () {
      render('https://api.punkapi.com/v2/beers');
   });

   route('/before2008', function () {
      render('https://api.punkapi.com/v2/beers?brewed_before=01-2008');
   });

   window.addEventListener('hashchange', router);
   window.addEventListener('load', router);
})()
