/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('freedvilleWebApp', [
  'ngRoute', 'ui.bootstrap'
]);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/writing", {templateUrl: "partials/writing.html", controller: "PageCtrl"})
    .when("/resume", {templateUrl: "partials/resume.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    // else 404
    .otherwise({templateUrl: "partials/404.html", controller: "PageCtrl"});
}]);

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("Page Controller reporting for duty.");

  // Activates the Carousel
  $('.carousel').carousel({
    interval: 5000
  });

  // Activates Tooltips for Social Links
  $('.tooltip-social').tooltip({
    selector: "a[data-toggle=tooltip]"
  })

  //Thanks to this post for fixing the "menu stays open on mobile" bug
  //http://stackoverflow.com/questions/21203111/bootstrap-3-collapsed-menu-doesnt-close-on-click
  $(document).ready(function () {
    $(".navbar-nav li a").click(function(event) {
        console.log("Called hide menu: navbar-nav");
        $(".navbar-collapse").collapse('hide');
    });
  });

});

app.controller('PatentCtrl', function($scope, $http) {
  console.log("Patent Controller reporting for duty.");
  $http.get('/data/patents.json')
       .then(function(res){
          $scope.patents = res.data;                
        });
});

app.controller('PublishedIpCtrl', function($scope, $http) {
  console.log("Published IP Controller reporting for duty.");
  $http.get('/data/publishedip.json')
       .then(function(res){
          $scope.publishedip = res.data;                
        });
});

app.controller('PublicationCtrl', function($scope, $http) {
  console.log("Publication Controller reporting for duty.");
  $http.get('/data/publications.json')
       .then(function(res){
          $scope.publications = res.data;                
        });
});

app.controller('BlogPostsCtrl', function($scope, $http) {
  console.log("Blog Posts Controller reporting for duty.");
  $http.get('/data/blogposts.json')
       .then(function(res){
          $scope.blogposts = res.data;                
        });
});

app.controller('AccordionWritingCtrl', function ($scope) {
    console.log("Accordion Writing Controller reporting for duty.");
    $scope.oneAtATime = false;

    $scope.groups = [{
        groupTitle: "Patents",
        templateUrl: "partials/patents.html"
    }, {
        groupTitle: "Publications",
        templateUrl: "partials/publications.html"
    }, {
        groupTitle: "Blog Posts",
        templateUrl: "partials/blogposts.html"
    }, {
        groupTitle: "Published IP",
        templateUrl: "partials/publishedip.html"
    }];

    $scope.status = {
        isOpen: new Array($scope.groups.length)
    };

    //simple version: http://www.abeautifulsite.net/detecting-mobile-devices-with-javascript/
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    //For desktop, auto-open all of them ... for mobile, auto-close
    for (var i = 0; i < $scope.status.isOpen.length; i++) {
        $scope.status.isOpen[i] = !isMobile.any();
    }
});

