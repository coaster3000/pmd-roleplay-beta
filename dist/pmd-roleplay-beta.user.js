// ==UserScript==
// @name	pmd-rp-beta
// @namespace	coaster3000@pmd-roleplay.forumotion.com
// @description	A userscript that provides all the custom new site features that are being tested. Once fully tested, these features are removed from this script and added to the site for global use.
// @include	http://pmd-roleplay.forumotion.org/*
// @include	https://pmd-roleplay.forumotion.org/*
// @match	https://pmd-roleplay.forumotion.org/*
// @match	http://pmd-roleplay.foruomtion.org/*
// @version	0.0.2
// @updateURL https://github.com/coaster3000/pmd-roleplay-beta/raw/releases/dist/pmd-roleplay-beta.meta.js
// @downloadURL https://github.com/coaster3000/pmd-roleplay-beta/raw/releases/dist/pmd-roleplay-beta.user.js
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

function firstInitAjax() {
  $("a.mainmenu,a.nav,a.forumlink").click(onAjaxClick);
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

  $("a.nav,a.forumlink").click(onAjaxClick);
}

firstInitAjax();


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
