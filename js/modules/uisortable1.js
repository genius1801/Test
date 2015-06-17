'use strict';

/*
 jQuery UI Sortable plugin wrapper
 @param [ui-sortable] {object} Options to pass to $.fn.sortable() merged onto ui.config
 */
angular.module('ui.sortable', [])
  .value('uiSortableConfig',{})
  .directive('uiSortable', [
    'uiSortableConfig','TaskService', '$timeout', '$log',
    function(uiSortableConfig, TaskService,$timeout, $log) {
      return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
          var savedNodes;
            
          function combineCallbacks(first,second){
            if(second && (typeof second === 'function')) {
              return function(e, ui) {
                first(e, ui);
                second(e, ui);
              };
            }
            return first;
          }

          var opts = {};

          var callbacks = {
            receive: null,
            remove:null,
            start:null,
            stop:null,
            update:null
          };

          angular.extend(opts, uiSortableConfig);

          if (ngModel) {
            scope.$watch(attrs.ngModel+'.length', function() {
              $timeout(function() {
                element.sortable('refresh');
              });
            });

            callbacks.start = function(e, ui) {
              ui.item.sortable = {
                index: ui.item.index(),
                cancel: function () {
                  ui.item.sortable._isCanceled = true;
                },
                isCanceled: function () {
                  return ui.item.sortable._isCanceled;
                },
                _isCanceled: false
              };
            };

            callbacks.activate = function(/*e, ui*/) {
              savedNodes = element.contents();
              var placeholder = element.sortable('option','placeholder');
              if (placeholder && placeholder.element && typeof placeholder.element === 'function') {
                var phElement = placeholder.element();
                if (!phElement.jquery) {
                  phElement = angular.element(phElement);
                }
                var excludes = element.find('[class="' + phElement.attr('class') + '"]');
                savedNodes = savedNodes.not(excludes);
              }
            };

            callbacks.update = function(e, ui) {
                
              if(!ui.item.sortable.received) {
                ui.item.sortable.dropindex = ui.item.index();
                ui.item.sortable.droptarget = ui.item.parent();
                element.sortable('cancel');
              }
              savedNodes.detach();
              if (element.sortable('option','helper') === 'clone') {
                savedNodes = savedNodes.not(savedNodes.last());
              }
              savedNodes.appendTo(element);
                console.log(ui.item.sortable.dropindex,ui.item.sortable.moved);
              if(ui.item.sortable.received && !ui.item.sortable.isCanceled()) {
                scope.$apply(function () {
                  ngModel.$modelValue.splice(ui.item.sortable.dropindex, 0,
                                             ui.item.sortable.moved);
                });
              }
            };

            callbacks.stop = function(e, ui) {
              if(!ui.item.sortable.received &&
                 ('dropindex' in ui.item.sortable) &&
                 !ui.item.sortable.isCanceled()) {
                  
                scope.$apply(function () {
                  ngModel.$modelValue.splice(
                    ui.item.sortable.dropindex, 0,
                    ngModel.$modelValue.splice(ui.item.sortable.index, 1)[0]);
                });
              } else {
                if((!('dropindex' in ui.item.sortable) || ui.item.sortable.isCanceled()) && element.sortable('option','helper') !== 'clone') {
                  savedNodes.detach().appendTo(element);
                }
              }
            };

            callbacks.receive = function(e, ui) {
              ui.item.sortable.received = true;
            };

            callbacks.remove = function(e, ui) {
              if (!ui.item.sortable.isCanceled()) {
                scope.$apply(function () {
                  ui.item.sortable.moved = ngModel.$modelValue.splice(
                    ui.item.sortable.index, 1)[0];
                });
              }
            };

            scope.$watch(attrs.uiSortable, function(newVal /*, oldVal*/) {
              angular.forEach(newVal, function(value, key) {
                if(callbacks[key]) {
                  if( key === 'stop' ){
                    // call apply after stop
                    value = combineCallbacks(
                      value, function() { scope.$apply(); });
                  }
                  value = combineCallbacks(callbacks[key], value);
                }
                element.sortable('option', key, value);
              });
            }, true);

            angular.forEach(callbacks, function(value, key) {
              opts[key] = combineCallbacks(value, opts[key]);
            });

          } else {
            $log.info('ui.sortable: ngModel not provided!', element);
          }
            
          element.sortable(opts);
        }
      };
    }
  ]);