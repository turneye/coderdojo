#**The Best Ionic v1.x starter template**

![Ionic Framework + Gulp](https://github.com/jdnichollsc/Ionic-Starter-Template/blob/gh-pages/images/ionic_40.png?raw=true)

**Reinventing the wheel, again!** *Sorry Ionic Team... but there are many noobs learning in Youtube!*

> Are you a noob? Use this template.

> Are you a master? Shut up! and use this template... the code only is accepted (pull request).

<div style="text-align:center"><img src ="https://github.com/jdnichollsc/Ionic-Starter-Template/blob/gh-pages/images/reinventing.the.wheel.jpg?raw=true" /></div>


#Instructions

1. Donwload this template.
2. Execute the command `npm install`
3. Run Ionic: 
   - `ionic serve` to test on the browser **(Gulp is running)**.
   - `ionic run android` to test on the device.
4. Modify this template and create your hybrid mobile app.

#Template Structure

Path         | Explanation
----------   | -------------
`./app/img/` | Images in your app.
`./app/js/`  | Scripts (Controllers, Services, Directives, etc).
`./app/scss/` | The styles of your app using Sass.
`./app/templates/` | Views in your app. (Only html files)
`./app/index.html` | The init page.
`./www/css/` | Other css styles like **[Animate.css](https://daneden.github.io/animate.css/)**, etc.
`./www/lib` | Download scripts using bower.
 	 
#Using bower to download libraries (npm preen included)

1. Download the script. Eg: `bower install ionic-datepicker --save`
2. Add the path of the files that you will use in `bower.json` from `www/lib`. Eg:
```
"preen": {
	//... More libraries
	"ionic-datepicker": [
		"dist/*.js"
		//Other files and folders will be deleted to reduce the size of your app
	]
}
```
3. Run gulp in the CLI. Eg: `gulp` or `gulp lib`
4. That's all, folks!!

#Ionic commands

Command         | Action
-------------   | -------------
`ionic login`   | To get logged in the CLI and use the Ionic services
`ionic upload`  | Upload your app to Ionic repository and debug remotely (Your clients) using the useful **[Ionic View App](http://view.ionic.io/)** 
`ionic serve`   | Test on the browser
`ionic serve --lab` | Test on the browser iOS and Android version 

#Cordova commands

Command         | Action
--------------- | -----------
cordova platform add `android` | Add the platform to build your app. `android - ios - windows`
cordova platform rm `android` | Remove the platform
cordova plugin add `git_url` --save | Add a plugin to use native capabilities. `Native Devs are your friends`
cordova plugin list | See the plugins that you're using. Find more **[here!](https://cordova.apache.org/plugins/)**
cordova plugin rm `plugin_name` --save | Remove a plugin
cordova build windows -- --appx=8.1-win --archs="x86" | Build the app to Windows (Open the Solution `platforms/windows/*.sln` on **[Visual Studio](https://www.visualstudio.com/en-us/products/visual-studio-community-vs.aspx)**)

#Tools

Name            | Description
--------------- | -----------
**[Visual Studio Code](https://code.visualstudio.com/)** | Build and debug your app using a [extension](https://marketplace.visualstudio.com/items?itemName=vsmobile.cordova-tools)
**[GapDebug](https://www.genuitec.com/products/gapdebug/)** | Only debug in the device
**[GenyMotion](https://www.genymotion.com/)** | Better Android Emulation

#Sign to Android (Commands)

1. `cordova build --release android`
2. `keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000`
3. `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore HelloWorld-release-unsigned.apk alias_name`
4. `zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk`

#Links

* **[Market place](http://market.ionic.io/)**
* **[Facebook group](https://www.facebook.com/groups/phonegapcordova/)**
* **[Codepen](http://codepen.io/ionic/pens/public/?grid_type=list)**
* **[Spanish Presentation](http://slides.com/juandavidnicholls/apps-moviles)**
* **[Ionic CLI](https://github.com/driftyco/ionic-cli)**
* **[Ionic Framework Examples](https://gist.github.com/jdnichollsc/53bfd200f04fd51c87d5)**
* **[Ionic Services](http://docs.ionic.io/)**

![Your code is mine!](https://github.com/jdnichollsc/Ionic-Starter-Template/blob/gh-pages/images/ofuscate.jpg?raw=true)

#Personal comments

* **Ionic, seriously?** The cache is the best... but, How is possible to know if a specific view is cached? (From a directive)

* **Microsoft, seriously??** Help to improve existing cordova plugins instead of create new plugins only for Windows platform!

* **Apple, seriously???** Thanks for nothing... I need a MAC but I'm poor like my colleagues at the beginning

# Happy coding
Made with <3

<img width="150px" src="http://phaser.azurewebsites.net/assets/nicholls.png" align="right">