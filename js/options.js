var readerDivWidth,readerFontColor,readerFontSize,readerBgColor,readerOverlayColor;


	var widthNow;
	var fontSize;
	var textColor;
	var overlayColor;
	var bgColor;

	var myInput = document.getElementsByTagName('input')

	chrome.storage.sync.get("divWidth",function(data){
				
				if(data.divWidth!==undefined)
				{
				widthNow=data.divWidth;		
				myInput[4].value=widthNow
				setWidth()
				}
		}
	);
	
		chrome.storage.sync.get("fontColor",function(data){
				if(data.fontColor!==undefined)
				{
				textColor=data.fontColor;
				myInput[2].value=textColor
				myInput[2].style.backgroundColor='#'+textColor
				document.getElementById('content').style.color = '#'+textColor
				}
		}
	);
	
			chrome.storage.sync.get("fontSize",function(data){
				if(data.fontSize!==undefined)
				{
				fontSize=data.fontSize;
				myInput[3].value=fontSize
				document.getElementsByTagName('div')[1].style.fontSize = fontSize+'px';
				}
		}
	);
	
		chrome.storage.sync.get("bgColor",function(data){
				
				if(data.bgColor!==undefined)
				{
				bgColor=JSON.parse(data.bgColor)
				myInput[1].value=rgbToHex(bgColor.rgb0, bgColor.rgb1,bgColor.rgb2)
				myInput[1].style.backgroundColor='#'+rgbToHex(bgColor.rgb0, bgColor.rgb1,bgColor.rgb2)
				document.getElementById('content').style.backgroundColor = 'rgb(' +  bgColor.rgb0+','+bgColor.rgb1+','+bgColor.rgb2+')'
				}
		}
	);
	
			chrome.storage.sync.get("overlayColor",function(data){
				
				if(data.overlayColor!==undefined)
				{
				overlayColor=JSON.parse(data.overlayColor)
				myInput[1].value=rgbToHex(overlayColor.rgb0, overlayColor.rgb1,overlayColor.rgb2)
				myInput[1].style.backgroundColor='#'+rgbToHex(overlayColor.rgb0, overlayColor.rgb1,overlayColor.rgb2)
				document.getElementById('backgroundDiv').style.backgroundColor = 'rgba(' +  overlayColor.rgb0+','+overlayColor.rgb1+','+overlayColor.rgb2+',.85)'
				}
		}
	);


	
	
	
	myInput[3].addEventListener("input", function(){
	 setTextSize()
	});
		myInput[4].addEventListener("input", function(){
	 setWidth()
	});
		myInput[5].addEventListener("click", function(){
	saveToLocal()
	});

	
	
	function rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
	
	
	function setBgColor(picker) {
		document.getElementById('content').style.backgroundColor = 'rgb(' +  Math.round(picker.rgb[0])+','+Math.round(picker.rgb[1])+','+Math.round(picker.rgb[2])+')'
		bgColor = {rgb0:Math.round(picker.rgb[0]),rgb1:Math.round(picker.rgb[1]),rgb2:Math.round(picker.rgb[2])}
	}
	
	function setOverlayColor(picker) {
		document.getElementById('backgroundDiv').style.backgroundColor = 'rgba(' + Math.round(picker.rgb[0]) +','+ Math.round(picker.rgb[1])+','+Math.round(picker.rgb[2])+',0.85)'
		overlayColor = {rgb0:Math.round(picker.rgb[0]),rgb1:Math.round(picker.rgb[1]),rgb2:Math.round(picker.rgb[2])}
	}
	
		function setTextColor(picker) {
		textColor= picker.toString()
		document.getElementById('content').style.color = '#'+textColor
	}
	
	
		function setTextSize() {
		fontSize = myInput[3].value;
		document.getElementsByTagName('div')[1].style.fontSize = fontSize+'px';
	}
	
		function setWidth() {
		widthNow = myInput[4].value;
		document.getElementById('content').style.width = widthNow+'%';
		document.getElementById('content').style.marginLeft = -widthNow/2-3.5+'%';
	}
	
	function saveToLocal(){
	chrome.storage.sync.set({"divWidth":widthNow},function(){});
	chrome.storage.sync.set({"fontColor":textColor},function(){});
	chrome.storage.sync.set({"fontSize":fontSize},function(){});
	chrome.storage.sync.set({"overlayColor":JSON.stringify(overlayColor)},function(){});
	chrome.storage.sync.set({"bgColor":JSON.stringify(bgColor)},function(){});
	}