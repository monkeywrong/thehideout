angular.module('theHideoutApp')
  .controller('galleryCtrl', ['$scope', 'Flickr', function ($scope, Flickr) {

    $scope.data = {};
    $scope.selectedAlbumID = '';

    $scope.dataPromise = Flickr.getPhotosetList()
      .success(function (data) {
        $scope.data.photosetList = data;

        // Select most recent gallery as init
        $scope.selectedAlbumID = $scope.data.photosetList.photosets.photoset[0].id;

        $scope.getPhotosetPhotos = function (selectedAlbumID) {
          Flickr.getPhotosetPhotos(selectedAlbumID)
            .success(function (data) {
              $scope.data.selectedAlbumPhotos = data;
              console.log($scope.data.selectedAlbumPhotos);
            })
            .error(function (error) {
              console.log(error);
            }) 
          }
        $scope.getPhotosetPhotos($scope.selectedAlbumID);

        // console.log($scope.selectedAlbumID);
        console.log($scope.data.photosetList);

      })
      .error(function (error) {
        console.log("That did not work.");
      });

      $scope.selectAlbum = function (albumID) {
        // select the gallery
        if ($scope.selectedAlbumID != albumID) {
          $scope.selectedAlbumID = albumID;
          $scope.getPhotosetPhotos($scope.selectedAlbumID);

        }
        
      }

    }])


