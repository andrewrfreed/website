/**
 * AngularJS Tutorial 1
 * @author Nick Kaye <nick.c.kaye@gmail.com>
 */

/**
 * Main AngularJS Web Application
 */
var app = angular.module('freedvilleWebApp', [
  'ngRoute'
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

