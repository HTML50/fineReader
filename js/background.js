

(function(){
        chrome.browserAction.onClicked.addListener(function(tab) {
            // 扩展向内容脚本发送消息
            chrome.tabs.sendMessage(tab.id,{
                greeting: "readNow"
            });
        });
    })();