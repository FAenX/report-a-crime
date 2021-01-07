(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  (document.querySelectorAll('.notification .delete') || []).forEach(function ($delete) {
    var $notification = $delete.parentNode;
    $delete.addEventListener('click', function () {
      $notification.parentNode.removeChild($notification);
    });
  });
});

var animateOnVisibilityTrue = function animateOnVisibilityTrue(element) {
  var animationClasses = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'animate__';
  return (// We create a Promise and return it
    new Promise(function (resolve, reject) {
      var classes = [];

      for (var i = 0; i < animationClasses.length; i++) {
        classes.push("".concat(prefix).concat(animationClasses[i]));
      }

      var nodeList = document.querySelectorAll(element);
      var node;

      for (var _i = 0; _i < nodeList.length; _i++) {
        node = nodeList[_i];
        node.classList.add("".concat(prefix, "animated"));
        classes.forEach(function (clas) {
          node.classList.add(clas);
        });
        node.addEventListener('animationend', handleAnimationEnd, {
          once: true
        });
      } // When the animation ends, we clean the classes and resolve the Promise


      function handleAnimationEnd() {
        for (var _i2 = 0; _i2 < nodeList.length; _i2++) {
          node = nodeList[_i2];
          node.classList.remove("".concat(prefix, "animated"));
          classes.forEach(function (clas) {
            node.classList.remove(clas);
          });
        }

        resolve('Animation ended');
      }
    })
  );
};

document.addEventListener('visibilitychange', function (e) {
  if (e) {//   
  }

  ;
  animateOnVisibilityTrue('.animate-on-visibility', ['pulse', 'slow']);
});

},{}]},{},[1]);
