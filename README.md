# Chrome Kiosk

Basic kiosk packaged application. Allows any URL to be loaded as a fullscreen kiosk in Google Chrome or Chrome OS, also disables device sleep mode while app is running.

## Release Notifications



## Features

### System
- Launches a specified URL full-screen at all times.
- Optional ability to rotate between URLs at a configurable rate
- Device power-saving (sleep mode) disabled
- Can be locked into-single app kiosk on managed Chrome devices.

### Interaction

- Option to hide cursor
- Option to disable context menu
- Option to disable image dragging
- Option to disable touch highlighting
- Option to disable text selection

Caveat: these interaction adjustments will only be applied once your content is fully loaded. If you have a multi-page application, the cursor, etc. may be enabled on each page load until the content is fully loaded. Recommended solution is to develop content as single-page (AJAX) application and/or use the following CSS:
```
*{
  cursor:none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}
```
and javascript:
```
window.oncontextmenu = function(){return false};
window.ondragstart = function(){return false};
```

### Local Administration

Setup can be accessed via keystroke (CTRL+A) and administer-configured username/password.

### Remote Administration

On desktop operating systems basic configuration as well as application restart options are available remotely. See "Known Limitations" for details on ChromeOS support.

### Inactivity Reset

Allow content to be reset after a administrator-specified period of inactivity.

### Manual Reset

Pressing F3 or CTRL+R will reset the content.

### Daily restart

Application can be completely restarted at an administrator-specified time once per day.

### Remote Schedule Server

Accepts a URL to a JSON feed for a content schedule. If no item is currently scheduled, the default content (specified by the Content URL on Kiosk setup page) is used. Default content will be overridden by scheduled items. Schedule URL is polled at configurable interval. `kiosk_t` parameter is appended to the URL with a value of the current timestamp to prevent caching of the schedule. Schedule should be formatted according to (a simplified version of) the format provided by [Chrome Sign Builder](https://chrome.google.com/webstore/detail/chrome-sign-builder/odjaaghiehpobimgdjjfofmablbaleem?hl=en) (exported schedules from Chrome Sign Builder are currently supported without support for screen position, repetition or display settings):
```
{
  "schedule": {
    "Value":  {
      "items": [
        {
          "content": "http://www.github.com",
          "end": "Tue Jul 14 2015 12:30:00 GMT-0500",
          "start": "Tue Jul 14 2015 09:30:00 GMT-0500",
        },
        {
          "content": "http://www.google.com",
          "end": "Tue Jul 15 2015 12:30:00 GMT-0500",
          "start": "Tue Jul 16 2015 09:30:00 GMT-0500",
        }
      ]
    }
  }
}
```

#### Note:

Remote schedule server must have [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) headers set or the [Allow-Control-Allow-Origin:*](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en-US) Chrome extension can be installed to allow access. JSONP is not an option since scripts from arbitrary domains cannot be executed inside Chrome extensions.

### Auto-start

On ChromeOS devices: Using managed devices and setting Kiosk application to start in Kiosk mode is the recommended solution.
On Windows and OSX: From chrome://apps/ right click on "Kiosk" and "Create shortcut" then copy this shortcut into the startup folder (Windows) or add to login items (OSX).
Linux: Likely similar to Windows and OSX, untested.

## Support & Feature Requests

This product is maintained by [Matt Cook](mailto:matt@lookitscook.com) and provided without warranty or guaranteed  support. If you need a bug fix please check that it has not be reported and submit details here: https://github.com/matt-cook/kiosk/issues

Patches and new features are released at our convenience. If you need a bug fix or new feature on a specific schedule, please send details to support@cook.company for a quote. Alternatively, if the issue does not yet have a milestone assigned to it, add a bounty via https://www.bountysource.com and either we or a third party developer can prioritize the update.

Pull requests are welcome.

## Known Limitations

- [Remote management is inaccessible on ChromeOS.](https://github.com/matt-cook/kiosk/issues/14)
- [Content URLs must be public. (http:// or https://)](https://github.com/matt-cook/kiosk/issues/9)
- [OSX menu bar will show on hover.](https://github.com/matt-cook/kiosk/issues/41)

## Changelog

-v5.12.1
  - New feature: CTRL + X will exit the application only from the admin setup

- v5.12.0
  - New feature: Navigation bar (home/back/refresh)
  - New feature: Screensaver
  - New feature: Hide Google Slides navigation (allowing Google Slides to be used for digital signage or screensaver)
  - New feature: Domain whitelist: prevent navigation to unspecified domains. 
  - Bug fix: Correct whitespace for pop-up windows
  - Bug fix: Correctly clear cache on inactivity

- v5.11.0
  - Reset content on F3 or CTRL+R
  - Optionally open print dialog on CTRL+P
  - Optionally clear cookies and cache on reset
  - Optionally override `Authorization` header
  - Fix bug with rendering remote admin, render index.html by default when serving local content.
  - Update internal web server to latest version

- v5.10.1
  - Auto-restart after 15 seconds if local file directory doesn't exist. For example, on some systems the app can start prior to external drives mounting after restart. This restart is canceled by pressing CTRL+A.

- v5.10.0
  - Fix UI bug requiring enter to be pressed after adding content URL (or a white screen was shown).
  - UI form improvements
  - Add option to rotate through content

- v5.9.3
  - Fix bug with legacy content loading

- v5.9.2
	- Fixed bug causing letterboxing on some displays

- v5.9.1
  - Scroll bar bug fix

- v5.9.0
  - Add support for tabs/multiple content URL
  - Update to Materialize 0.97.8

- v5.8.2
  - Open new windows in modal to allow closing

- v5.8.1
  - Allow new windows & prompt dialogs behind setting.   

- v5.8.0
  - Allow new windows
  - Added support for prompt dialogs
  - Remove demo link
  - Remove ZEBRADOG references

- v5.7.3
  - Bug fix: inactivity reset correctly detects input on touch screens
  - Bug fix: prevent content reload from throwing error

- v5.7.2
  - Allow simplified version of schedule JSON
  - Bug fix: load schedule JSON cross-domain
  - Bug fix: append time to schedule JSON to prevent caching

- v5.7.1
  - Bug fix: clear cache now fully clears cache

- v5.7.0
    - Sleep/screensaver mode configurable

- v5.6.0
  - Allow files to be served from local directory
  - Add option to clear cache on save
  - Add option to set custom user agent
  - Bug fix: Reload will now work correctly on all systems.

- v5.5.2
  - Bug fix: Correctly focus form-fields on load.
  - Bug fix: Save cookies, etc. across sessions.
  - Bug fix: 1:00 or 2:00 AM/PM restart time now loads correctly.
  - Change default remote management port to 8080 since 80 is blocked on ChromeOS.
  - Allow videos in content to go full screen.
  - Prevent exiting fullscreen by pressing escape

- v5.5.1
  - Bug fix: users on 5.4.0 with scheduling enabled experience rapid polling upon upgrade to 5.5.0.

- v5.5.0
  - Bug fix: switching scheduled content
  - Added ability to set schedule polling interval

- v5.4.0
    - Added remote schedule server support
    - Added option to hide cursor
    - Added option to disable context menu
    - Added option to disable image dragging
    - Added option to disable touch highlighting
    - Added option to disable text selection

- v5.3.4
    - Bug fix: restart scheduling

- v.5.3.3
    - Bug fix: reset/restart combo.

- v.5.3.2
    - Optional webcam/mic access added.

- v.5.3.1
    - Prevent inactivity reset via `console.log("kiosk:active")` in content page.

- v.5.3.0
    - updated to Materialize v0.96.1
    - added local administration
    - added daily restart
    - added inactivity reset

- v.5.2.1
	- auto-restart on content crash or unresponsive

- v.5.2.0
	- added remote administration
	- remote restart for ChromeOS devices in kiosk mode
	- skinned with [Materialize](http://materializecss.com/)

- v5.1.2
	- automatically attempt to reconnect to content if connection broken

- v5.1.1
	- Bug fix: 1/5 screen fullscreen on Windows 8

- v5.1.0
	- started using proper semver
	- added demo link

- v5.0
	- added support for offline use

- v4.0
	- prevent system sleep	(previously only prevented display sleep)

- v3.0
	- cleaned up design files

- v2.0
	- added branding
	- cleaned up interface
	- switched to setup page from key-combo options page

- v1.0
	- initial draft version
