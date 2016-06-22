
if (isWeixinBrowser())
    {
	alert("You are using WeChat!\n\nIf you have Zom installed, please select menu option 'Open in Browser', then choose Zom.\n\nIf you do NOT have Zom installed, please select menu option 'Open in Browser', then choose an external web browser app");
    }

function isWeixinBrowser(){
  return /micromessenger/.test(navigator.userAgent.toLowerCase())
}
