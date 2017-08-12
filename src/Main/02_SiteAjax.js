var SiteAjax = (function($,w){
  'use strict';
  var ajaxer = {page: null, title: null, href: null};

  function checkForProperties(obj, props) {
    if (obj == null || typeof obj == "undefined") return false;
    if (typeof props == "string") return (obj.hasOwnProperty(props) || checkForProperties(Object.getPrototypeOf(obj), props));
    else if (!Array.isArray(props)) throw "Illegal Argument Error: props parameter is not valid, must be a string or an Array of strings.";
    for (var i in props) {
      if (!checkForProperties(obj, props[i]) && !checkForProperties(Object.getPrototypeOf(obj), props[i])) return false;
    }
    return true;
  }

  function displayLoader() {
    var loaderICON = "http://i.imgur.com/6ZwRMCn.gif";
    $("body").append(`<div id="loader" style="display: block; width:100%; height: 100%; background-color: rgba(0,0,0,0.3); z-index: 150; position: fixed; top:0; left: 0; padding: 0; margin: 0; text-align: center;"><img src="${loaderICON}" style="margin: auto; position: relative; top: 50%"/></div>`);
  }

  function hideLoader() {
    $("#loader").remove();
  }

  function loadComplete() {
    hideLoader();
    w.history.replaceState({page: ajaxer.page}, ajaxer.title, ajaxer.href);
    document.title=ajaxer.title;
    initAjax();
  }

  function loadPage(a) { // a should be an html "a" element
    if (!checkForProperties(a, ["href","textContent"])) throw "Invalid Parameter: a is not a valid object.";

    displayLoader();

    ajaxer = {page: "forum", title: a.textContent, href: a.href};

    $("#page-body").load(a.href + " #page-body > div", loadComplete); // Actual load operation
  }


  function clickHandler() {
    if (typeof w.history == "undefined" || typeof w.history.replaceState == "undefined") return true; // AJAX loading not supported fully. Just reload the page instead.

    loadPage(this); // jshint ignore:line
    return false; // Cancel normal navigation.
  }

  function initAjax(){
    if ($("#chatbox_top").length > 0) { // Reinitiate chatbox if found.
      $("#chatbox_top").html(`<iframe src="/chatbox/index.forum?page=front&amp;" id="frame_chatbox" scrolling="no" width="100%" height="100%" marginwidth="0" marginheight="0" frameborder="0"></iframe>`);
    }

    $("a").each(function(i,e) {
      if (e.host=="pmd-roleplay.forumotion.org" && /https?:\/\/pmd-roleplay\.forumotion\.org\/[ft].+/.test(e.href)) {

        $(e).unbind("click.pmdAjax").bind("click.pmdAjax", clickHandler);
      }
    });
  }

  function init() {
    initAjax();
  }

  return {init: init};
})(jQuery, window);
SiteAjax.init();
