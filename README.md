The watch.js script will periodically ping the ports and check for the proper responses. If it doesn't receive a proper response, it will alert you. If you don't turn it off but the server does not recover, it will keep alerting you, doubling the wait time upon each successive failure (e.g. 5min, 10min, 20min, etc) so as to not megaspam you. When this is the case, it'd be in your best interest to turn it off before [mailgun](http://mailgun.org/) gets angry at your free-tier account. See [mailgun](http://mailgun.org/)'s limits and restrictions for more info.

## Requirements and Setup

**Works on windows, mac, and of course linux (debian)**
*Requires NPM and Node version 5.0+ to be installed*

You must have created a free mailgun account @ [mailgun](http://mailgun.org/) (trivial). Once you create the account, you're ready. Just enter in the API key and the proper sandbox FROM address (and, of course, a proper TO address) in `config.json` and you're ready to go. Takes less than 5 minutes if you're going slow.

Note that you may have to add the email address you specify in "TO" to the list of allows recipients in the mailgun GUI. This is a one-time thing and is only necessary if you'll be sending email to addresses that are not your mailgun account's main address (the address you signed up with).

## How To Use

First, configure the `config.json` file to suite your needs (see *Requirements and Setup* above).

Next:

```
git clone https://git.xunn.io/open-source/cs154-bombserver-watcher.git
cd cs154-bombserver-watcher
npm install
./watch.js
```

After you install once, you don't have to run install again. You can just call ./watch.js and enjoy the magic.

## Configuration

Configuration is stored in config.json. Configuration values are:

  *  *to*: the email address to send emails to using [mailgun](http://mailgun.org/)
  *  *from*: the email address from which emails will appear to have been sent
  *  *subject*: the subject line of all sent emails
  *  *key*: the mailgun API key (get one by creating a free mailgun account)
  *  *uri*: the URI used to access the mailgun API (changes based on sandbox account token)
  *  *checkFrequency*: the number of seconds to wait between status checks. It is recommended that you do not set this below 300 (default 600) or mailgun and/or bomb.cs may be angry with you. Upon every contiguous failure, this number will double. Upon success, it will return to the value you specified.
  *  *verbose*: should we pour our soul into stdout? Defaults to true.
  *  *targets*: an array of hostname + port combos (i.e. "bomb.cs:12345") that will be pinged to check for upness. Set to empty array to disable.
  *  *scoreboard*: the complete url (+ protocol) of the scoreboard.
  *  *bePatient*: instead of sending an email immediately, wait 0.5 * `checkFrequency` and try again. If it fails a second time, *then* panic and send an email!

That's about it. Runs on windows, mac, or linux, as long as you keep the console window open and are connected to the university network/VPN.

By: Bernard Dickens III, UChicago
