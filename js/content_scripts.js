var hasPoped=false; 



var readerDivWidth,readerFontColor,readerFontSize,readerBgColor,readerOverlayColor;






 
 chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            if (request.greeting === "readNow"){
                if(!hasPoped){
				chrome.storage.sync.get("divWidth",function(data){if(data.divWidth!==undefined){readerDivWidth=data.divWidth}});
				chrome.storage.sync.get("fontColor",function(data){if(data.fontColor!==undefined){readerFontColor=data.fontColor}});
				chrome.storage.sync.get("fontSize",function(data){if(data.fontSize!==undefined){readerFontSize=data.fontSize}});
				chrome.storage.sync.get("bgColor",function(data){if(data.bgColor!==undefined){readerBgColor=JSON.parse(data.bgColor)}});
				chrome.storage.sync.get("overlayColor",function(data){if(data.overlayColor!==undefined){readerOverlayColor=JSON.parse(data.overlayColor)};check();});
				}
            }
        });


function check(){
			var text="";
            if (window.getSelection()) {
                text = window.getSelection().toString();
				if (text!= "") {
				var str=text.replace(/\n/g, '<p>')
                var readDiv = "<div id='fineReadDiv'><p>" + str + "</div>";
				var overlayDiv = "<div id='fineRead-overlay-Div'></div>";

                $("body").append(overlayDiv);
				$("#fineRead-overlay-Div").css({
				"position": "fixed",
				"left": "0",
				"top": "0",
				"width": "100%",
				"height": "100%",
				"background-color":readerOverlayColor?"rgba("+readerOverlayColor.rgb0+","+readerOverlayColor.rgb1+","+readerOverlayColor.rgb2+",.85)":"rgba(16, 106, 133, 0.85)",
				"z-index": "99999998",
                }).show("slow");


				$("body").append(readDiv);
                $("#fineReadDiv").css({
				"display":"none",
				"top":$(window).scrollTop()+200,
				"color": readerFontColor?'#'+readerFontColor:'#00455E',
				"position": "absolute",
				"left": "50%",
				"width": readerDivWidth?readerDivWidth+'%':'60%',
				"margin-left": readerDivWidth?-readerDivWidth/2-3.5+'%':'-33.5%',
				"z-index": "99999999",
				"text-align": "left",
				"background":readerBgColor?"rgb("+readerBgColor.rgb0+","+readerBgColor.rgb1+","+readerBgColor.rgb2+")":"rgb(255, 255, 239)",
				"overflow": "hidden",
				"padding": "3.5%",
				"font-size": readerFontSize?readerFontSize+'px':"12px"
                }).fadeIn("slow");
	
				
				$("#fineReadDiv p").css({
				"font-size": "2em",
				"text-indent": "2em",
				"line-height": "1.5",
				"font-family": "MS Mincho,Batang,Dotum"
                })

				
				$("#fineRead-overlay-Div").bind("click",function(){
					$("#fineRead-overlay-Div").fadeOut(500,function(){$("#fineRead-overlay-Div").remove()});
					$("#fineReadDiv").fadeOut(500,function(){$("#fineReadDiv").remove();hasPoped=false;});					
				});
				hasPoped=true;
				$('body,html').animate({'scrollTop':$(window).scrollTop()+100},500);
				
            }
            }
			if(text==""){
				alert("请在页面拖选欲优化阅读的文本")
			}
			}