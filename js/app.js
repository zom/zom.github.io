$(document).foundation()

var language = navigator.languages && navigator.languages[0] ||
               navigator.language ||
               navigator.userLanguage;

var inviteLink = document.location.href;
inviteLink = decodeURIComponent(inviteLink.substring(inviteLink.indexOf("#")+1));

document.getElementById("linktibetan").href = "i/index_tibetan.html#" + encodeURIComponent(inviteLink);
document.getElementById("linkchinese").href = "i/index_chinese.html#" + encodeURIComponent(inviteLink);

if (language.includes("bo"))
        window.location.href = "i/index_tibetan.html#" + inviteLink;
else if (language.includes("zh"))
        window.location.href = "i/index_chinese.html#" + inviteLink;

var xmppLink = "";
var inviteUser = "";
var inviteKey = "";

if (inviteLink.startsWith("@"))
{
	inviteUser = inviteLink.substring(1).split(":")[0];
	xmppLink = "zom://invite?id=" + encodeURIComponent(inviteLink);
	document.getElementById("contactinfo").innerHTML="<a style=\"color:white\" href=\"" + xmppLink + "\">" + inviteUser + "</a>";
}
else if (inviteLink.startsWith("#")||inviteLink.startsWith("!"))
{
	inviteUser = inviteLink.substring(1).split(":")[0];
	xmppLink = "zom://join?id=" + encodeURIComponent(inviteLink);
	document.getElementById("buttonaddfriend").value = "Join Group";
	document.getElementById("contactinfo").innerHTML="<a style=\"color:white\" href=\"" + xmppLink + "\">A group</a>";
}
else
{
inviteLink = Base64.decode(inviteLink);

//handle safe encoding; for some reason our library doesn't
inviteLink = inviteLink.replace("_","\\");


if (inviteLink.indexOf("?")!=-1)
{
	inviteUser = inviteLink.substring(0,inviteLink.indexOf("?"));
        
//        if (inviteLink.indexOf("otr=")!=-1)
//		inviteKey = inviteLink.substring(inviteLink.indexOf("otr=")+4).substring(0,40);

	nxmppLink = "xmpp:" + inviteUser + "?subscribe&otr-fingerprint=";
//&otr-fingerprint=" + inviteKey;
}
else
{
	xmppLink = "xmpp:" + inviteLink + "?subscribe&otr-fingerprint=";
	inviteUser = inviteLink;
}
}



document.getElementById("qrcode").onclick = function() { 
		document.location.href=xmppLink;

        };

document.getElementById("buttonaddfriend").onclick = function() { 
		document.location.href=xmppLink;

        };

var qrcode = new QRCode(document.getElementById("qrcode"), {
	text: xmppLink,
	width: 196,
	height: 196,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

