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
