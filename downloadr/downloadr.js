(function($) {
  $.fn.downloadr = function() {
  	return this.each(function() {
  	
  	function returnBrowserTest(){
				
					var dlBrowser = $.browser.browser();
					
					var dlString = '';
					
					switch(dlBrowser){
					
						case "Safari":
						
						dlString = 'right click on the icon below and choose <strong>Save Linked File As...</strong> or <strong>Download Linked File As...</strong> from the menu.';
						
						break;
						
						case "Firefox":
						
						dlString = 'right click on the icon below and choose <strong>Save Link As...</strong> from the menu.'
						
						break;
						
						case "Msie":
						
						dlString = 'right click on the icon below and choose <strong>Save Target As...</strong>.';
						
						break;
						
						default:
						
						dlString = 'right click on the icon below and choose <strong>Save Target As...</strong> from the menu.';
					}
					
					
					return dlString;
				}	
				
				var element = this;
			  
			  	$(element).addClass("download_link");
			  	
			  	var theTitle = $(element).attr('title');
			  				  	
				var theLink = $(element).attr('href');
	
			  	$(element).bind('click',function(e){
			  	
			  		e.preventDefault();

				  	var html = "";
				  	
				  	html += "<h2>Download '" + theTitle + "'</h2>";
				  	html += "<p>To download '" + theTitle + "', simply " + returnBrowserTest() + "</p>";
				  	html += "<p style='text-align:center;'><a href='" + theLink + "'><img src='downloadr/download.png' alt='Right click and save as to download' id='download_file'/></a></p>";
				  	html += "<p>If you want to open the file in your browser, just click <strong><a href='" + theLink + "'>here</a></strong>.</p>";
				  	
				  	jQuery.facebox(html);
			  		
			  	});
			  	});

  }
})(jQuery);