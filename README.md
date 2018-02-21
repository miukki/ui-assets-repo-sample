# UI Assets

## Basic project setup

```
git clone git@github.com:miukki/ui-assets-repo-sample.git
```

## CSS config:
1. main/:project -- main config for project (included for both versions: mobile/desktop)
2. DESKTOP config _desktop.scss contain: 
2.1 config for each project
```
@import "<%= projects %>/<%= proj %>/desktop";
```
3. MOBILE config _mobile.scss contain:
3.1
```
#you can also add shared mobile set of scss
@import "<%= projects %>/<%= proj %>/mobile"; 
```
4. RESPONSIVE config:
4.1 in gruntCongig.json:
```

	"css": {
		"resp": {
			"lisa": true
		},
		"paths": {
			"projects": "../bootstrap/projects",
			"globals": "../bootstrap/global",
			"mixins": "../bootstrap/mixins"

		}
	
	},

```
4.2 in _config.scss
```
<!-- build:include:resp _resp.scss -->
<!-- /build -->

<!-- build:include:desktop,resp _desktop.scss -->
<!-- /build -->
```
5. Commands:
```
PROJECT=[:project] yarn run  sass -- map #default TARGET=desktop
PROJECT=[:project] TARGET=desktop yarn run  sass -- map
PROJECT=[:project] TARGET=mobile yarn run  sass -- map

#resp assets configured in gruntConfig.json file
``` 



## DEV:

### Setup env:
```
yarn install
bower i
PROJECT=[:project] yarn run start
# for install yarn  follow up the link: https://yarnpkg.com/en/docs/cli/install
```
### Sass compile for dev UI server
```
PROJECT=[:project] yarn run sass -- map && yarn run prefixer
```

### Sass compile for Front-end repos (dev)
```
PROJECT=[:project] yarn run sass -- map
```

### Watcher
For access watcher, call: 
#### watch particular single task
```
#access wacher >  open new tab in Terminal :
grunt watcher:[project]:[type]. e.g: grunt watcher:studytour:tmpls
//project: [:project]
```

### Grunt, list of all tasks with description:
```
grunt --help
```


## Basic info:
[read](docs/basic.md )


## Work with feature branches
[read](docs/flow.md )


## Update Tag
[read](docs/tag.md )


## Hooks
[read](docs/hooks.md )

## Expose a web server running on your local machine (ngrok setup).
[read](docs/ngrok.md )


## UI Tests
[read](docs/tests.md)

## Deploy for surge (ui-assets-repo-sample[:project].surge.sh).

```
PROJECT={:project} yarn run surge
#in DIST you will get version for surge
```

## Test DIST
requirements: python env (Python 2.7.11 or higher).

```
pushd ./dist; python -m SimpleHTTPServer 9000; popd #v 2.*
pushd ./dist; python -m http.server 9000; popd #v 3.*

```


## Migration guide for prefxies 0.13.4 -> 2.2.0 (angular-bootstrap)
Follow the link https://github.com/angular-ui/bootstrap/wiki/Migration-guide-for-prefixes

## VS code settings
```
{
    "files.associations": {
       "*.tmpl": "html" 
    }


}
```