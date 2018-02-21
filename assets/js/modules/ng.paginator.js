'use strict';

/**
 * @ngdoc directive
 * @name paginator.directive:stBatchList
 * @scope
 * @restrict EA
 * @element ANY
 * @requires stConfig of the smart-table
 
 * @example
 * <st-batch-list items-limit="70" items-by-page="25" displayed-pages="5" template-url="path/to/tmpl.tmpl" batch-fn="main.batchFn(arg)" 
 * reset="main.reset"></st-batch-list>
 *  @example
 * path/to/tmpl.tmpl:
 * <table st-table="displayedItems" st-safe-src="items" >
 * <tbody><tr ng-repeat="item in displayedItems"></tr><div st-batch-pagination></div>
 * </tbody></table>
 */

angular
  .module('paginator', ['smart-table'])
  .directive('stBatchList', stBatchList);

stBatchList.$inject = ['stConfig', '$parse'];

function stBatchList(stConfig, $parse) {
  var ITEMS_LIMIT = 70;
  var ITEMS_BY_PAGE = 25;

  var directive = {
    link: linker,
    scope: {
      itemsLimit: '@?',
      itemsByPage: '@?',
      batchFn: '&?',
      items: '=?',
      reset: '=?'
    },
    templateUrl: function(element, attrs) {
      return attrs.templateUrl;
    },
    //template: '<ng-include src="getContentUrl()" include-replace></ng-include>',
    restrict: 'EA'
  };

  return directive;

  function linker(scope, element, attrs) {

    // scope.getContentUrl = function() {
    //  return attrs.templateUrl || '';  
    // };

    var currentBatchIndex = 1;

    scope.items = scope.items || [];
    var itemsLimit = +(scope.itemsLimit || ITEMS_LIMIT);
    var itemsByPage = +(scope.itemsByPage || ITEMS_BY_PAGE);
    var displayedPages = parseInt(itemsLimit/itemsByPage);

    scope.reset = function() {
      currentBatchIndex = 1;
      execBatch();
    };

    function nextBatch () {
      currentBatchIndex = currentBatchIndex + 1;
      execBatch();
    }

    execBatch();

    function execBatch() {
      var arg = {
        page: currentBatchIndex,
        limit: itemsLimit
      };
      var promise = typeof scope.batchFn === 'function' && scope.batchFn({arg: arg});

      if (promise && typeof promise.then === 'function') {

        promise.then(function(resp) {
          if (!resp) {
            return;
          }
          resp.data = resp.data || [];
          scope.items = arg.page === 1 ? [].concat(resp.data) : scope.items.concat(resp.data);

          angular.extend(stConfig.pagination, {
            totalCount: parseInt(resp.x_pagination_count) || scope.items.length,
            itemsByPage: itemsByPage,
            displayedPages: displayedPages,
            nextBatch: nextBatch
          });
          
        });
      }

    }






  }
}



angular
  .module('paginator')
  .directive('stBatchPagination', stBatchPagination);

/**
 * @ngdoc directive
 * @name paginator.directive:stBatchPagination
 * @restrict EA
 * @param {string} stTemplate The path of template for paginator. 
 * Param is optional. (Default: 'shared/directives/st-batch-pagination.tmpl')
 * @description custom pagination directive for st-table
 * @example
    <tfoot>
      <tr>
        <td colspan="4" class="text-center">
          <div st-batch-pagination></div>
        </td>
      </tr>
    </tfoot>
 */

stBatchPagination.$inject = ['stConfig', '$rootScope'];

function stBatchPagination(stConfig, $rootScope) {

  return {
    restrict: 'EA',
    require: '^stTable',
    templateUrl: function(element, attrs) {
      return attrs.stTemplate || 'shared/directives/st-batch-pagination.tmpl';
    },
    link: function(scope, element, attrs, ctrl) {
      var paginationState = ctrl.tableState().pagination, start, 
      end, i, prevPageIndex, isLastBatch, isPenultimatePage;

      function redraw () {
        scope.currentPage = Math.floor(paginationState.start / paginationState.number) + 1;
        
        start = scope.currentPage;
        end = start + stConfig.pagination.displayedPages;

        if (end > paginationState.numberOfPages) {
          end = paginationState.numberOfPages + 1;
          start = scope.currentPage === 1 ? scope.currentPage :  Math.max(1, end - stConfig.pagination.displayedPages);
        }

        scope.pages = [];
        for (i = start; i < end; i++) {
          scope.pages = [].concat(scope.pages, i);
        }

        if (prevPageIndex) {
          scope.selectPage(prevPageIndex);
          prevPageIndex = 0;
        }

        isLastBatch = !paginationState.totalItemCount || 
        (stConfig.pagination.totalCount <= paginationState.totalItemCount);
        isPenultimatePage = scope.pages.length > 2 && scope.currentPage === paginationState.numberOfPages - 1;
        scope.isLastPage = scope.currentPage === paginationState.numberOfPages;
        scope.isFirstPage = scope.currentPage === 1;

      }

      //is penultimate page load next batch
      scope.$watch(function(){
        return scope.isLastPage || isPenultimatePage;
      }, function(n){
        if (n && !isLastBatch){
          loadNextBatch();
        }
      });

      //table state --> view
      scope.$watch(function() {
        return paginationState;
      }, redraw, true);

      scope.$watch(function(){
        return $rootScope.spinnerActive;
      }, function(n){
        scope.spinnerActive = n;
      });

      scope.$watch(function(){
        return stConfig.pagination.itemsByPage;
      }, function(newValue, oldValue) {
        if (newValue !== oldValue) {
          scope.selectPage(1);
        }
      });

      scope.selectPage = function(page) {
        if (page > 0 && page <= paginationState.numberOfPages) {
          ctrl.slice((page - 1) * stConfig.pagination.itemsByPage, stConfig.pagination.itemsByPage);
        }
      };

      scope.loadPrevPage = function() {
        if (scope.isFirstPage) {
          return;
        }

        var page = scope.currentPage - 1;
        scope.selectPage(page);
      };

      scope.loadNextPage = function() {
        var page = scope.currentPage + 1;
        scope.selectPage(page);
      };

      function loadNextBatch() {
        if (isLastBatch) {
          return;
        }
        prevPageIndex = scope.currentPage;
        stConfig.pagination.nextBatch();
      }

      if (!paginationState.number) {
        ctrl.slice(0, stConfig.pagination.itemsByPage);
      }
    }
  };
}
