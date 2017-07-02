const ANIM_DISABLE_TXT = "Disable Animation";
const ANIM_ENABLE_TXT = "Enable Animation";
function setAnimations(value) {
	var state = (my_getcookie("AnimatePMD") > 0);
	if (value != state) {
		my_setcookie("AnimatePMD", (value?1:0), true);
		updateAnimations();
	}
}

function updateAnimations() {
	var state = ((my_getcookie("AnimatePMD") || 0) > 0);
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
