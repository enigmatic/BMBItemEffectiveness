"use strict";function sortItemFunction(a,b){var aT=a.wins/a.total,bT=b.wins/b.total;return bT>aT?1:aT>bT?-1:0}var ApplicationConfiguration=function(){var applicationModuleName="black-market-brawlers-item-effectiveness",applicationModuleVendorDependencies=["ngResource","ngAnimate","ui.router","ui.bootstrap","ui.utils","ngMaterial"],registerModule=function(moduleName,dependencies){angular.module(moduleName,dependencies||[]),angular.module(applicationModuleName).requires.push(moduleName)};return{applicationModuleName:applicationModuleName,applicationModuleVendorDependencies:applicationModuleVendorDependencies,registerModule:registerModule}}();angular.module(ApplicationConfiguration.applicationModuleName,ApplicationConfiguration.applicationModuleVendorDependencies),angular.module(ApplicationConfiguration.applicationModuleName).config(["$locationProvider",function($locationProvider){$locationProvider.hashPrefix("!")}]),angular.element(document).ready(function(){"#_=_"===window.location.hash&&(window.location.hash="#!"),angular.bootstrap(document,[ApplicationConfiguration.applicationModuleName])}),ApplicationConfiguration.registerModule("core"),ApplicationConfiguration.registerModule("users"),angular.module("core").config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/"),$stateProvider.state("home",{url:"/",templateUrl:"modules/core/views/home.client.view.html"})}]),angular.module("core").controller("HeaderController",["$scope",function($scope){}]),angular.module("core").controller("HomeController",["$scope","$http","$sce",function($scope,$http,$sce){$scope.items=[],$scope.items.sort(sortItemFunction);var getItems=function(champ){champ?$http.get("/api/champion/"+champ.id).success(function(response){if($scope.items=response.sort(sortItemFunction),$scope.selectedItem){var sel=response.filter(function(obj){return+obj.id===+$scope.selectedItem.id})[0];sel?$scope.selectedItem=sel:($scope.selectedItem.wins=0,$scope.selectedItem.total=0)}}).error(function(response){$scope.error=response.message}):$http.get("/api/items").success(function(response){if($scope.items=response.sort(sortItemFunction),$scope.selectedItem){var sel=response.filter(function(obj){return+obj.id===+$scope.selectedItem.id})[0];sel?$scope.selectedItem=sel:($scope.selectedItem.wins=0,$scope.selectedItem.total=0)}}).error(function(response){$scope.error=response.message})},statDetail=function(_text,_average,_item,_flipGood){var average=parseFloat(_average),item=parseFloat(_item);return{text:_text,avg:average,item:item,avgPct:100*average/(average+item),itemPct:100*item/(average+item),good:_flipGood?average>item:item>average}},calcStats=function(){if($scope.champItemDetail&&$scope.champStats){var champStats=$scope.champStats,champItemDetail=$scope.champItemDetail;$scope.champItemDetail.itemStats=[],$scope.champItemDetail.itemStats.push(statDetail("Kills",champStats.kills,champItemDetail.kills)),$scope.champItemDetail.itemStats.push(statDetail("Deaths",champStats.deaths,champItemDetail.deaths,!0)),$scope.champItemDetail.itemStats.push(statDetail("Assists",champStats.assists,champItemDetail.assists));var avg=(parseFloat(champStats.kills)+parseFloat(champStats.assists))/parseFloat(champStats.deaths),item=(parseFloat(champItemDetail.kills)+parseFloat(champItemDetail.assists))/parseFloat(champItemDetail.deaths);$scope.champItemDetail.itemStats.push(statDetail("KDA",avg,item)),$scope.champItemDetail.itemStats.push(statDetail("cs",champStats.cs,champItemDetail.cs)),$scope.champItemDetail.itemStats.push(statDetail("gold",champStats.gold,champItemDetail.gold))}},getChampItemDetail=function(){$scope.champItemDetail=null,$scope.selectedChampion&&$scope.selectedItem&&$http.get("/api/champion/"+$scope.selectedChampion.id+"/item/"+$scope.selectedItem.id).success(function(response){$scope.champItemDetail=response,calcStats()}).error(function(response){$scope.error=response.message})};$http.get("/api/champions").success(function(response){$scope.champions=response}).error(function(response){$scope.error=response.message}),$scope.selectChampion=function($champion){$scope.selectedChampion=$champion,getItems($champion),$http.get("/api/champion/"+$scope.selectedChampion.id+"/stats").success(function(response){$scope.champStats=response,calcStats()}).error(function(response){$scope.error=response.message}),getChampItemDetail()},$scope.TrustDangerousSnippet=function(snippet){return $sce.trustAsHtml(snippet)},$scope.clickItem=function($item){$scope.selectedItem=$item,getChampItemDetail(),$item&&$http.get("/api/item/"+$item.id).success(function(response){$scope.selectedItemStats=response.sort(sortItemFunction)}).error(function(response){$scope.error=response.message})},getItems(null)}]),angular.module("core").service("Menus",[function(){this.defaultRoles=["*"],this.menus={};var shouldRender=function(user){if(!user)return this.isPublic;if(~this.roles.indexOf("*"))return!0;for(var userRoleIndex in user.roles)for(var roleIndex in this.roles)if(this.roles[roleIndex]===user.roles[userRoleIndex])return!0;return!1};this.validateMenuExistance=function(menuId){if(menuId&&menuId.length){if(this.menus[menuId])return!0;throw new Error("Menu does not exists")}throw new Error("MenuId was not provided")},this.getMenu=function(menuId){return this.validateMenuExistance(menuId),this.menus[menuId]},this.addMenu=function(menuId,isPublic,roles){return this.menus[menuId]={isPublic:isPublic||!1,roles:roles||this.defaultRoles,items:[],shouldRender:shouldRender},this.menus[menuId]},this.removeMenu=function(menuId){this.validateMenuExistance(menuId),delete this.menus[menuId]},this.addMenuItem=function(menuId,menuItemTitle,menuItemURL,menuItemType,menuItemUIRoute,isPublic,roles,position){return this.validateMenuExistance(menuId),this.menus[menuId].items.push({title:menuItemTitle,link:menuItemURL,menuItemType:menuItemType||"item",menuItemClass:menuItemType,uiRoute:menuItemUIRoute||"/"+menuItemURL,isPublic:null===isPublic||"undefined"==typeof isPublic?this.menus[menuId].isPublic:isPublic,roles:null===roles||"undefined"==typeof roles?this.menus[menuId].roles:roles,position:position||0,items:[],shouldRender:shouldRender}),this.menus[menuId]},this.addSubMenuItem=function(menuId,rootMenuItemURL,menuItemTitle,menuItemURL,menuItemUIRoute,isPublic,roles,position){this.validateMenuExistance(menuId);for(var itemIndex in this.menus[menuId].items)this.menus[menuId].items[itemIndex].link===rootMenuItemURL&&this.menus[menuId].items[itemIndex].items.push({title:menuItemTitle,link:menuItemURL,uiRoute:menuItemUIRoute||"/"+menuItemURL,isPublic:null===isPublic||"undefined"==typeof isPublic?this.menus[menuId].items[itemIndex].isPublic:isPublic,roles:null===roles||"undefined"==typeof roles?this.menus[menuId].items[itemIndex].roles:roles,position:position||0,shouldRender:shouldRender});return this.menus[menuId]},this.removeMenuItem=function(menuId,menuItemURL){this.validateMenuExistance(menuId);for(var itemIndex in this.menus[menuId].items)this.menus[menuId].items[itemIndex].link===menuItemURL&&this.menus[menuId].items.splice(itemIndex,1);return this.menus[menuId]},this.removeSubMenuItem=function(menuId,submenuItemURL){this.validateMenuExistance(menuId);for(var itemIndex in this.menus[menuId].items)for(var subitemIndex in this.menus[menuId].items[itemIndex].items)this.menus[menuId].items[itemIndex].items[subitemIndex].link===submenuItemURL&&this.menus[menuId].items[itemIndex].items.splice(subitemIndex,1);return this.menus[menuId]},this.addMenu("topbar")}]),angular.module("users").config(["$httpProvider",function($httpProvider){$httpProvider.interceptors.push(["$q","$location","Authentication",function($q,$location,Authentication){return{responseError:function(rejection){switch(rejection.status){case 401:Authentication.user=null,$location.path("signin");break;case 403:}return $q.reject(rejection)}}}])}]),angular.module("users").config(["$stateProvider",function($stateProvider){$stateProvider.state("profile",{url:"/settings/profile",templateUrl:"modules/users/views/settings/edit-profile.client.view.html"}).state("password",{url:"/settings/password",templateUrl:"modules/users/views/settings/change-password.client.view.html"}).state("accounts",{url:"/settings/accounts",templateUrl:"modules/users/views/settings/social-accounts.client.view.html"}).state("signup",{url:"/signup",templateUrl:"modules/users/views/authentication/signup.client.view.html"}).state("signin",{url:"/signin",templateUrl:"modules/users/views/authentication/signin.client.view.html"}).state("forgot",{url:"/password/forgot",templateUrl:"modules/users/views/password/forgot-password.client.view.html"}).state("reset-invalid",{url:"/password/reset/invalid",templateUrl:"modules/users/views/password/reset-password-invalid.client.view.html"}).state("reset-success",{url:"/password/reset/success",templateUrl:"modules/users/views/password/reset-password-success.client.view.html"}).state("reset",{url:"/password/reset/:token",templateUrl:"modules/users/views/password/reset-password.client.view.html"})}]),angular.module("users").controller("AuthenticationController",["$scope","$http","$location","Authentication",function($scope,$http,$location,Authentication){$scope.authentication=Authentication,$scope.authentication.user&&$location.path("/"),$scope.signup=function(){$http.post("/auth/signup",$scope.credentials).success(function(response){$scope.authentication.user=response,$location.path("/")}).error(function(response){$scope.error=response.message})},$scope.signin=function(){$http.post("/auth/signin",$scope.credentials).success(function(response){$scope.authentication.user=response,$location.path("/")}).error(function(response){$scope.error=response.message})}}]),angular.module("users").controller("PasswordController",["$scope","$stateParams","$http","$location","Authentication",function($scope,$stateParams,$http,$location,Authentication){$scope.authentication=Authentication,$scope.authentication.user&&$location.path("/"),$scope.askForPasswordReset=function(){$scope.success=$scope.error=null,$http.post("/auth/forgot",$scope.credentials).success(function(response){$scope.credentials=null,$scope.success=response.message}).error(function(response){$scope.credentials=null,$scope.error=response.message})},$scope.resetUserPassword=function(){$scope.success=$scope.error=null,$http.post("/auth/reset/"+$stateParams.token,$scope.passwordDetails).success(function(response){$scope.passwordDetails=null,Authentication.user=response,$location.path("/password/reset/success")}).error(function(response){$scope.error=response.message})}}]),angular.module("users").controller("SettingsController",["$scope","$http","$location","Users","Authentication",function($scope,$http,$location,Users,Authentication){$scope.user=Authentication.user,$scope.user||$location.path("/"),$scope.hasConnectedAdditionalSocialAccounts=function(provider){for(var i in $scope.user.additionalProvidersData)return!0;return!1},$scope.isConnectedSocialAccount=function(provider){return $scope.user.provider===provider||$scope.user.additionalProvidersData&&$scope.user.additionalProvidersData[provider]},$scope.removeUserSocialAccount=function(provider){$scope.success=$scope.error=null,$http["delete"]("/users/accounts",{params:{provider:provider}}).success(function(response){$scope.success=!0,$scope.user=Authentication.user=response}).error(function(response){$scope.error=response.message})},$scope.updateUserProfile=function(isValid){if(isValid){$scope.success=$scope.error=null;var user=new Users($scope.user);user.$update(function(response){$scope.success=!0,Authentication.user=response},function(response){$scope.error=response.data.message})}else $scope.submitted=!0},$scope.changeUserPassword=function(){$scope.success=$scope.error=null,$http.post("/users/password",$scope.passwordDetails).success(function(response){$scope.success=!0,$scope.passwordDetails=null}).error(function(response){$scope.error=response.message})}}]),angular.module("users").factory("Authentication",[function(){var _this=this;return _this._data={user:window.user},_this._data}]),angular.module("users").factory("Users",["$resource",function($resource){return $resource("users",{},{update:{method:"PUT"}})}]);