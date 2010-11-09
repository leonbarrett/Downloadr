new function() {
 
     var Public = {
          'browser': function() { return Private.browser;   },
          'version': {
              'number': function() { return Private.version.number; },
              'string': function() { return Private.version.string; }
          },
               'OS': function() { return Private.OS;        },

              'aol': function() { return Private.aol;       },
           'camino': function() { return Private.camino;    },
          'firefox': function() { return Private.firefox;   },
            'flock': function() { return Private.flock;     },
             'icab': function() { return Private.icab;      },
        'konqueror': function() { return Private.konqueror; },
          'mozilla': function() { return Private.mozilla;   },
             'msie': function() { return Private.msie;      },
         'netscape': function() { return Private.netscape;  },
            'opera': function() { return Private.opera;     },
           'safari': function() { return Private.safari;    },
           
            'linux': function() { return Private.linux;     },
              'mac': function() { return Private.mac;       },
              'win': function() { return Private.win;       }
    };

    $.browser = Public;
    var Private = {

          'browser': 'Unknown',
          'version': {
              'number': undefined,
              'string': 'Unknown'
          },
               'OS': 'Unknown',

              'aol': false,
           'camino': false,
          'firefox': false,
            'flock': false,
             'icab': false,
        'konqueror': false,
          'mozilla': false,
             'msie': false,
         'netscape': false,
            'opera': false,
           'safari': false,

            'linux': false,
              'mac': false,
              'win': false
    };

    for( var  i = 0,                    // counter
             ua = navigator.userAgent,  // the navigator's user agent string
             ve = navigator.vendor,     // the navigator's vendor string
           data = [                     // browser tests and data
                { // Safari <http://www.apple.com/safari/>
                          'name': 'Safari',
                       'browser': function() { return /Apple/.test(ve) }
                },
                { // Opera <http://www.opera.com/>
                          'name': 'Opera',
                       'browser': function() {
                                      return window.opera != undefined
                                  }
                },
                { // iCab <http://www.icab.de/>
                          'name': 'iCab',
                       'browser': function() { return /iCab/.test(ve) }
                },
                { // Konqueror <http://www.konqueror.org/>
                          'name': 'Konqueror',
                       'browser': function() { return /KDE/.test(ve) }
                },
                { // AOL Explorer <http://downloads.channel.aol.com/browser>
                    'identifier': 'aol',
                          'name': 'AOL Explorer',
                       'browser': function() {
                                      return /America Online Browser/.test(ua)
                                  },
                       'version': function() {
                                      return ua.match(/rev(\d+(?:\.\d+)+)/)
                                  }
                },
                { // Flock <http://www.flock.com/>
                          'name': 'Flock',
                       'browser': function() { return /Flock/.test(ua) }
                },
                { // Camino <http://www.caminobrowser.org/>
                          'name': 'Camino',
                       'browser': function() { return /Camino/.test(ve) }
                },
                { // Firefox <http://www.mozilla.com/firefox/>
                          'name': 'Firefox',
                       'browser': function() { return /Firefox/.test(ua) }
                },
                { // Netscape <http://browser.netscape.com/>
                          'name': 'Netscape',
                       'browser': function() { return /Netscape/.test(ua) }
                },
                { // Internet Explorer <http://www.microsoft.com/windows/ie/>
                  //                   <http://www.microsoft.com/mac/ie/>
                    'identifier': 'msie',
                          'name': 'Internet Explorer',
                       'browser': function() { return /MSIE/.test(ua) },
                       'version': function() {
                                      return ua.match(
                                          /MSIE (\d+(?:\.\d+)+(?:b\d*)?)/
                                      )
                                  }
                },
                { // Mozilla <http://www.mozilla.org/products/mozilla1.x/>
                          'name': 'Mozilla',
                       'browser': function() {
                                      return /Gecko|Mozilla/.test(ua)
                                  },
                       'version': function() {
                                      return ua.match(/rv:(\d+(?:\.\d+)+)/)
                                  }
                 }
             ];
         i < data.length;
         i++
    ) {
        if( data[i].browser() ) { // we have a match
            // If the identifier is not explicitly set, use a lowercase
            // version of the given name.
            var identifier = data[i].identifier ? data[i].identifier
                                                : data[i].name.toLowerCase();

            // Make a note that this browser was detected.
            Private[ identifier ] = true;

            // $.browser.browser() will now return the correct browser.
            Private.browser = data[i].name;

            var result;
            if( data[i].version != undefined && (result = data[i].version()) ) {
                // Use the explicitly set test for browser version.
                Private.version.string = result[1];
                Private.version.number = parseFloat( result[1] );
            } else {
                // Otherwise use the default test which searches for the
                // version number after the browser name in the user agent
                // string.
                var re = new RegExp(
                    data[i].name + '(?:\\s|\\/)(\\d+(?:\\.\\d+)+(?:(?:a|b)\\d*)?)'
                );

                result = ua.match(re);
                if( result != undefined ) {
                    Private.version.string = result[1];
                    Private.version.number = parseFloat( result[1] );
                }
            }

            // Once we've detected the browser there is no need to check the
            // others.
            break;
        }
    };

    for( var  i = 0,                  // counter
             pl = navigator.platform, // the navigator's platform string
           data = [                   // OS data and tests
                { // Microsoft Windows <http://www.microsoft.com/windows/>
                    'identifier': 'win',
                          'name': 'Windows',
                            'OS': function() { return /Win/.test(pl) }
                },
                { // Apple Mac OS <http://www.apple.com/macos/>
                          'name': 'Mac',
                            'OS': function() { return /Mac/.test(pl) }
                },
                { // Linux <http://www.linux.org/>
                          'name': 'Linux',
                            'OS': function() { return /Linux/.test(pl) }
                }
           ];
       i < data.length;
       i++
    ) {
        if( data[i].OS() ) { // we have a match
            // If the identifier is not explicitly set, use a lowercase
            // version of the given name.
            var identifier = data[i].identifier ? data[i].identifier
                                                : data[i].name.toLowerCase();

            // Make a note that the OS was detected.
            Private[ identifier ] = true;

            // $.browser.OS() will now return the correct OS.
            Private.OS = data[i].name;

            // Once we've detected the browser there is no need to check the
            // others.
            break;
        }
    };
}();