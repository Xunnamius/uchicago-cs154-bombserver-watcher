The watch.js script will periodically ping the ports and check for the proper responses. If it doesn't receive a proper response, it will alert you. If you don't turn it off but the server does not recover, it will keep alerting you. When this is the case, it'd be in your best interest to turn it off before [textbelt](http://textbelt.com/) gets angry at you. See [textbelt](http://textbelt.com/)'s limits and restrictions for more info.

Configuration is stored in config.json. Configuration values are:

  *  phone: the phone number to send messages to using [textbelt](http://textbelt.com/)
  *  checkFrequency: the number of seconds to wait between status checks. It is recommended that you do not set this below 600 (default) or textbelt and bomb.cs will both be angry with you.
  *  verbose: should we pour our soul into stdout? Defaults to true.
  *  targets: an array of hostname + port combos (i.e. "bomb.cs:12345") that will be pinged to check for upness. Set to empty array to disable.
  *  scoreboard: the complete url (+ protocol) of the scoreboard.

That's about it. Runs on windows, mac, or linux, as long as you keep the console window open and are connected to the university network/VPN.

Bernard
