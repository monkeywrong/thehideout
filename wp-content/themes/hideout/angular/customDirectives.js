angular.module("theHideoutApp")
  .directive("myDivHeight", function ($window) {

    function setDivHeight(element, attrs) {
      
      var screenProportion = attrs["myDivHeight"];
      var windowHeight,
          headerSize;
      
      if (attrs["minusHeader"]) {
        headerSize = jQuery(".page-header-top").height();
        headerSize += jQuery(".page-header-bottom").height();
      } else {
        headerSize = false;
      }



      switch (screenProportion) {
        case "fullScreen":
        heightModifier = 1;
        break;
        case "half":
        heightModifier = 0.5;
        break
          default:
          heightModifier = 1;
      }

      windowHeight = $window.innerHeight * heightModifier;
      console.log("wh before" + windowHeight);
      if (headerSize != false) {
        windowHeight = windowHeight - headerSize;
      }
      element.css('height', windowHeight + "px");

    }

    return {
      link: function (scope, element, attrs) {
        
        jQuery(window).load(setDivHeight(element, attrs));
   
        angular.element($window).on('resize', function () {
          setDivHeight(element, attrs);
        });

      }
    }

  });

