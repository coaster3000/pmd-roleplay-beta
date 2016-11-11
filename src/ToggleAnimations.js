function toggleAnimation() {
	var state = my_getcookie("AnimatePMD");
	var btn = $("#ToggleAnimation");
	if (state == 1) {
		console.log("Disabled Animation");
		my_setcookie("AnimatePMD",0,true);
	} else {
		console.log("Enabled Animation");
		my_setcookie("AnimatePMD",1,true);
		
	}
	/*
		This is used to prevent an inconsistent state from occurring during loading of page. 
		An odd bug occurs with fetching the cookie that cannot be reproduced consistently.
	*/
	state = my_getcookie("AnimatePMD"); // Update state and act accordingly
	
	if (state == 1) {
		btn.val("Disable Animation");
		$(".animation").addClass("animated");
	} else {
		btn.val("Enable Animation");
		$(".animation").removeClass("animated");
	}
}

if ($(".animation").length > 0) {
	$("body").prepend('<input type="button" name="AnimationToggle" value="Enable Animation" id="ToggleAnimation"/>');
	var btn = $("#ToggleAnimation");
	var state = my_getcookie("AnimatePMD");
	btn.click(toggleAnimation);
	
	// Check settings
	if (state == 1) {
		console.log("Animation Started as Enabled");
		btn.val("Disable Animation");
		$(".animation").addClass("animated");
	} else {
		console.log("Animation Started as Disabled");
		btn.val("Enable Animation");
		$(".animation").removeClass("animated");
	}
}