// ==UserScript==
// @name	pmd-rp-beta
// @namespace	coaster3000@pmd-roleplay.forumotion.com
// @description	A userscript that provides beta features for the site pmd-roleplay.forumotion.org. All beta features are eventually added to site once enough feedback is provided on site from userscript testing.
// @include	http://pmd-roleplay.forumotion.org/*
// @include	https://pmd-roleplay.forumotion.org/*
// @match	https://pmd-roleplay.forumotion.org/*
// @match	http://pmd-roleplay.forumotion.org/*
// @version	0.0.5
// @license MIT; https://github.com/coaster3000/pmd-roleplay-beta/blob/master/LICENSE.md
// @supportURL https://github.com/coaster3000/pmd-roleplay-beta/issues
// @updateURL https://openuserjs.org/meta/coaster3000/pmd-rp-beta.meta.js
// @downloadURL https://openuserjs.org/install/coaster3000/pmd-rp-beta.user.js
// @grant	none
// ==/UserScript==


// Source: src/Header.js

(function(window) {
	'use strict';

// Source: src/Main/SiteAjax.js

var ajaxer = {page: null, title: null, href: null};

function ajaxComplete() {
  $("#loader").remove();
  window.history.replaceState({page: ajaxer.page}, ajaxer.title, ajaxer.href);
  document.title=this.textContent;
  initAjax();
}

function onAjaxClick(e) {
  //Display Loader ICON
  var loaderICON = "http://i.imgur.com/6ZwRMCn.gif";
  $("body").append(`<div id="loader" style="display: block; width:100%; height: 100%; background-color: rgba(0,0,0,0.3); z-index: 150; position: fixed; top:0; left: 0; padding: 0; margin: 0; text-align: center;"><img src="${loaderICON}" style="margin: auto; position: relative; top: 50%"/></div>`);

  ajaxer.page="forum";
  ajaxer.title=this.textContent;
  ajaxer.href=this.href;
  $("#page-body").load(this.href + " #page-body > div", ajaxComplete);
  return false;
}

function initAjax(){

  if ($("#chatbox_top").length > 0) { //Chatbox re-init
    $("#chatbox_top").html(`<iframe src="/chatbox/index.forum?page=front&amp;" id="frame_chatbox" scrolling="no" width="100%" height="100%" marginwidth="0" marginheight="0" frameborder="0"></iframe>`);
  }
  $("a").each(function(i,e) {
    if (e.host=="pmd-roleplay.forumotion.org" && /https?:\/\/pmd-roleplay\.forumotion\.org\/[ft].+/.test(e.href)) {

      $(e).unbind("click.pmdAjax").bind("click.pmdAjax", onAjaxClick);
    }
  });
}


initAjax();


// Source: src/Main/ToggleAnimations.js

const PMD_ANIMATE_COOKIE = "PMD-Animate";
const ANIM_DISABLE_TXT = "Disable Animation";
const ANIM_ENABLE_TXT = "Enable Animation";
function setAnimations(value) {
	var state = (my_getcookie(PMD_ANIMATE_COOKIE) > 0);
	if (value != state) {
		my_setcookie(PMD_ANIMATE_COOKIE, (value?1:0), true);
		updateAnimations();
	}
}

function updateAnimations() {
	var state = ((my_getcookie(PMD_ANIMATE_COOKIE) || 0) > 0);
	if (state)
		$(".animation").addClass("animated");
	else
		$(".animation").removeClass("animated");

	$("#ToggleAnimationsBtn").val(state?ANIM_DISABLE_TXT:ANIM_ENABLE_TXT);
}

function toggleAnimations() {
	var btn = $("#ToggleAnimationsBtn");
	if (btn.val()==ANIM_ENABLE_TXT) {
		setAnimations(true);
	} else {
		setAnimations(false);
	}

}

function createAnimationsButton() {
	$("body").append('<input type="button" name="ToggleAnimations" id="ToggleAnimationsBtn" value="Toggle Animations"/>');
	$("#ToggleAnimationsBtn").on("click", toggleAnimations);
}

createAnimationsButton();
updateAnimations();


// Source: src/Footer.js

})(window);