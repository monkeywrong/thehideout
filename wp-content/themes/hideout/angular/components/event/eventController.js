angular.module("theHideoutApp")
  .constant('eventListPageCount', 4) // items per page
  .constant("eventListActiveClass", "btn-primary")
  .controller("eventCtrl", ['$scope', '$timeout', '$filter', 'eventListPageCount', 'apiService', 'eventListActiveClass', function ($scope, $timeout, $filter, eventListPageCount, apiService, eventListActiveClass) {

    // GET THE DATA
    $scope.dataPromise = apiService.getAllEvents().success(function(data) {
      $scope.data.events = data;

      //Convert the timestamp to millseconds
      for (var i = 0; i < $scope.data.events.length; i++) {
        $scope.data.events[i].date_of_event = $scope.data.events[i].date_of_event * 1000;
      };
     console.log($scope.data.events);
    });

    $scope.primaryTemplateMessages = {
      'welcomeMessage': 'Music at The Hideout',
      'location': 'events'
    };


  // FILTER BY CATEGORY

    var selectedCategory = null; // no filtering applied until one of the category buttons is clicked: see categoryFilterFn

    $scope.selectedCategory = "All";
    
    $scope.selectCategory = function (newCategory) {
      selectedCategory = newCategory;
      $scope.selectedPage = 1;
      // Go to page 1 on new category selection
      // Make the current category available in the scope. Note $scope.selectedCategory != selectedCategory within the controller
      if (newCategory == undefined) {
        $scope.selectedCategory = "All";
      } else {
        $scope.selectedCategory = selectedCategory;
      }
    }; 

    $scope.selectPage = function (newPage) {
      $scope.selectedPage = newPage;
      $scope.scrollTo("entries");
    }

    $scope.categoryFilterFn = function (event) {

      // This will return false if both conditions are false, true otherwise.
      return  selectedCategory == null ||
              event.category == selectedCategory;
    }

    // Return the active class if the item matches the selected category, or return an empty string
    $scope.getCategoryClass = function (category) {
      return (selectedCategory == category) ? eventListActiveClass : "";
    }

    $scope.getPageClass = function (page) {
      return $scope.selectedPage == page ? eventListActiveClass : "";
    }

    $scope.scrollTo = function (id) {
      jQuery('html,body').animate({scrollTop: jQuery("#" + id).offset().top},'slow');
    }

  // FILTERS

    $scope.futureEvents = function (event) {

      // check that the date of the input is now or later
      var today = new Date().getTime();
       if (event.date_of_event >= today) {
        return true;
       } else {
        return false;
       }
    }

    $scope.pastEvents = function (event) {

      // check that the date of the input is in the past
      var today = new Date().getTime();
       if (event.date_of_event < today) {
        return true;
       } else {
        return false;
       }
    }


    $scope.dataPromise.success(function () {
      $scope.numberOfFutureEvents = $scope.getNumberOfEvents($filter, $scope.futureEvents);
      console.log($scope.numberOfFutureEvents);
      $scope.previousLimit = $scope.getPreviousLimit($scope.numberOfFutureEvents);
      console.log($scope.previousLimit);

    })

    $scope.getPreviousLimit = function (numberOfFutureEvents) {
      var limit = 0,
          futureEvents = numberOfFutureEvents;

      switch (futureEvents) {
        case 1:
        limit = 3;
        break;
        case 2:
        limit = 2;
        break;
        case 3:
        limit = 1;
        break;
        case 4:
        limit = 0;
        break
        default:
        limit = 0;
      }
      return limit;
    }

    $scope.getNumberOfEvents = function ($filter, callback) {
      var numberEvents = 0;
      numberEvents = $filter('filter')($scope.data.events, callback).length;
      return numberEvents;
    }

    
  // PAGINATION

    $scope.selectedPage = 1; // Initial, or on page reload
    $scope.pageSize = eventListPageCount;

  // SINGLE POSTS

    $scope.getSinglePostArrayNumber = function () {
      for (var i = 0; i < $scope.data.events.length; i++) {
        if ($scope.data.events[i].ID == $scope.singlePostID) {
          var arrayNumber = i;
        }
      }
      return arrayNumber;
    }

    $scope.getSinglePost = function () {

      // expose the singlepost object to the view
      $scope.dataPromise.success(function () {
        $scope.singlePostArrayNumber = $scope.getSinglePostArrayNumber();
        $scope.singlePost = $scope.data.events[$scope.singlePostArrayNumber]; 
      })
    }

    // Will only be a number on single app page calls
    if (angular.isNumber($scope.singlePostID)) {
      $scope.getSinglePost();
    } else {
      // console.log("single post ID not received");
    }
  }]);



