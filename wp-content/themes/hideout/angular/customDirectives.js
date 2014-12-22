angular.module("theHideoutApp")
  .directive("myDivHeight", function ($window) {

    function setDivHeight(element, attrs) {
      
      var topBackgroundSize = attrs["myDivHeight"],
          windowHeight = '',
          headerSize = '';
         
      if (attrs["minusHeader"]) {
        headerSize = jQuery(".page-header-top").height();
        headerSize += jQuery(".page-header-bottom").height();
      } else {
        headerSize = false;
      }

       var setTopBackgroundSize = function (topBackgroundSize) {
        if (topBackgroundSize == 'full') {
          windowHeight = $window.innerHeight;
          if (headerSize != false) {
            windowHeight = windowHeight - headerSize;
          }
        }
        if (topBackgroundSize == 'navbar') {
          windowHeight = jQuery(".navbar-container").height();
        }
      }

      setTopBackgroundSize(topBackgroundSize);
      // Check if the footer, and if not hide on XS devices
      if ($window.innerWidth < 768 && attrs['mySection'] !== 'footer') {
        console.log('Hey');
        element.css('display', 'None');
      } else {
        element.css('display', 'Initial');
      }

      element.css('height', windowHeight + "px");
      console.log($window.innerWidth);
    }

    return {

      link: function (scope, element, attrs) {
        
        jQuery(window).load(setDivHeight(element, attrs));
        angular.element($window).on('resize', function () {
          setDivHeight(element, attrs);
        });
      }
    }

  })
  .directive("myVerticalCenter", function () {

    function getPanelMargin(scope, element) {
      var panelMargin = 0;
      var panelMargin = scope.fctn();

      applyCss(panelMargin, element);

    }

    function applyCss(panelMargin, element) {
      var marginTop = panelMargin;
      element.css('margin-top', marginTop + "px")
    }

    return {
      scope: {
        fctn: '&extFunction'
      },
      link: function (scope, element, attrs) {
        jQuery(document).ready(getPanelMargin(scope, element));
        
      }
    }

  })
  .directive("newsBackgroundImage", ['$filter', function ($filter) {

    // get access to the controller scope. 

    function applyCss(scope, element, attrs) {
      var itemNumber = attrs["newsBackgroundImage"] - 1; // reduce by one for array logic
      var url = scope.data.filteredNewsPosts[itemNumber].featured_image.attachment_meta.sizes.eventboard.url;
      console.log(url);
      var urlParam = 'url(' + url + ')';
      // console.log(urlParam);
      // console.log(itemNumber);

      element.css('background-image', urlParam);
      // console.log(urlParam);

    }

    return {
      link: function (scope, element, attrs) {
        scope.dataPromise.success(function() {
          scope.data.filteredNewsPosts = $filter('orderBy')(scope.data.newsPosts, '-date');
          scope.data.filteredNewsPosts = $filter('limitTo')(scope.data.filteredNewsPosts, '4');
          applyCss(scope, element, attrs);
        })
        

      }
    }
  }]);




