'use strict';

angular.module('ngLoadingSpinner', ['angularSpinner'])

.config(['usSpinnerConfigProvider', function(usSpinnerConfigProvider){

  usSpinnerConfigProvider.setDefaults({radius:30, width:10, length: 20, position: 'fixed', top: '50%', left: '50%'});
  usSpinnerConfigProvider.setTheme('spinner-1', {});
  usSpinnerConfigProvider.setTheme('spinner-2', {radius:16, width:5, length: 10});


}])

/**
  * @ngdoc directive
  * @name ngLoadingSpinner.directive:usSpinner
  * @restrict EAC
  * @description Angular directive to show an animated spinner
  * @element
  * @example
      <doc:example module="ngLoadingSpinner" deps="">
          <doc:source>
              <script>
                angular.module('yourApp', [
                  'ngLoadingSpinner'
                ])
              </script>


          <div ng-controller="Ctrl">
            <span us-spinner spinner-key="spinner-1" spinner-start-active="true"></span>
          </div>

          </doc:source>
      </doc:example>
**/

.directive('usSpinner',   ['$http', '$rootScope', 'usSpinnerService', function ($http, $rootScope, usSpinnerService){
  return {
      link: function (scope, elm, attrs)
      {
          if (attrs.$attr.usSpinnerStandalone) {
            return;
          }
          //$rootScope.spinnerActive = false;
          scope.isLoading = function () {
              return $http.pendingRequests.length > 0;
          };

          scope.$watch(scope.isLoading, function (loading)
          {
              $rootScope.spinnerActive = loading;
              
              if(loading){

                usSpinnerService.stop(!$rootScope.modalActive ? 'spinner-2' : 'spinner-1');
                usSpinnerService.spin(!$rootScope.modalActive? 'spinner-1' : 'spinner-2');

              } else{

                usSpinnerService.stop('spinner-1');
                usSpinnerService.stop('spinner-2');

              }
          });
      }
  };
}]);
