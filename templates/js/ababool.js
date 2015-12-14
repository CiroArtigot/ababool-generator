
		var app = angular.module('ababool', ['ngAnimate']); // Declaramos un modulo y el nombre de la aplicación "tienda"


		app.controller('ababoolCtrl', function ($scope, $timeout, $http) {

			$scope.getpages = function() {
				$scope.pages = document.getElementsByClassName("pt-page");
				return true;
			}

			$scope.thenavigator = function(id) {

				$scope.left = '';
				$scope.right = '';
				$scope.down = '';
				$scope.up = '';

				var page = document.getElementById(id);

				if(page.hasAttribute("data-left")) $scope.left = page.attributes['data-left'].value;
				if(page.hasAttribute("data-right")) $scope.right = page.attributes['data-right'].value;
				if(page.hasAttribute("data-up")) $scope.up = page.attributes['data-up'].value;
				if(page.hasAttribute("data-down")) $scope.down = page.attributes['data-down'].value;

				if($scope.left) $scope.navleft = true;
				else $scope.navleft = false;

				if($scope.right) $scope.navright = true;
				else $scope.navright = false;

				if($scope.up) $scope.navup = true;
				else $scope.navup = false;

				if($scope.down) $scope.navdown = true;
				else $scope.navdown = false;

				if($scope.down || $scope.up || $scope.right || $scope.left) $scope.navigator = true;
				else $scope.navigator = false;

				return true;
			}


			$scope.getpages(); //all the loaded pages


			$scope.$watch("current", function(){
				$scope.thenavigator($scope.current);
			});




			//

			$scope.ineffect = 'pt-current pt-scaleUp';
			$scope.outeffect = 'pt-currentout pt-moveToBottom pt-ontop';

			$scope.animationout = '';
			$scope.animationin = '';



			/* preloader out */
			$timeout(function() {
            	$scope.preloader = true;
       		}, 1000);

			/* gotopage funtion */
			$scope.gotopage = function(id) {


				if(id=='') return true;

				var ispage = 0;
				for(page in $scope.pages) {
						if(id==page) ispage = 1;
				}
				if(!ispage) {

					console.log('no esta la pagina');

					$http.get('ajax/?id=' + id).
				    success(function(data, status, headers, config) {

							console.log('recibinmos data: ' + data);
				      $scope.newpage = data;
				    }).
				    error(function(data, status, headers, config) {
				      // log error
							console.log('error');
				    });

						console.log('terminando');

						return true;

				}

				$scope.hidecontainer = $scope.current;

				$timeout(function() {

					$scope.animationout = $scope.current;
					$scope.animationin = id;
					$scope.current = id;

					$scope.thenavigator(id);

				}, 1000);

				return true;
			}



			$scope.isvisible = function(id) {
				if(id == $scope.current) return true;
				if(id == $scope.animationin) return true;
				return false;
			}

			$scope.viewcontainer = function(id) {

				//return true;

				if(id == $scope.hidecontainer) return false;

				if(id == $scope.current && $scope.animationin == '') return true;
				return false;
			}

			$scope.theclass = function(id) {
				if(id == $scope.animationout) return $scope.outeffect
				if(id == $scope.animationin) return $scope.ineffect
				return '';
			}

			$scope.endpage = function(id, event) {
				// cuando termina la animacion ponemos la variable en blanco.
				if($scope.animationout == id ) $scope.animationout = '';

				if($scope.animationin == id ) {
					$scope.animationin = '';
					console.log('acaba: ' + id);

          var pahtlocation = '';
					var pahtlocationfull = pahtlocation +  id;

					document.title = 'El titulo';
					window.history.pushState({}, "Title", pahtlocationfull);


				}
				$scope.hidecontainer = '';
				$scope.$apply();
			}

		});


		app.directive('animationend', function() {
			return {
				restrict: 'A',
				scope: {
					animationend: '&'
				},
				link: function(scope, element) {
					var callback = scope.animationend(),
						  events = 'animationend webkitAnimationEnd MSAnimationEnd' +
								'transitionend webkitTransitionEnd';
					element.on(events, function(event) {
						callback.call(element[0], element[0].attributes['id'].value, event);
					});
				}
			};
		});
