# Domain Mashup
A simple JavaScript class to create domain name variations from a list of single words and checks if the domain name are available.

Matches are stored in Local Storage so no need for a Database, however I have used a PHP parser to handle the cross-domain call to the domain lookup API.

# Demo
You can view a working version here - http://sjmac.com/demos/domainmashup/?id=music

This demo creates domain name variations based on a [JSON file](http://sjmac.com/demos/domainmashup/data/music.json) matching the name of the ID passed in the URL.

# Project Philosophy
Something I just threw together and wanted to share, as it's a handy tool that replaced me going between Excel sheets and domain lookup sites! 

# Installation
Simple: Point to the `js/domainmashup.js` file, and make sure `php/lookup.php` is inlcuded in your project.

#APIs
You'll need to create a free account with [freedomainapi.com](http://freedomainapi.com/), and update `$apiKey` in `lookup.php`.

# Basic Usage
You must create a JSON file in this format with a list of words you want mashed up. Words can be hyphenated, but must not contain spaces.

```
[
    {
        "name": "Alternative"
    },
    {
        "name": "Blues"
    },
    {
        "name": "Classical"
    }
]
```

The following HTML markup is required:

```
<div class="result available">
	<h2>Available</h2>
	<ul></ul>
</div>

<div class="result unavailable">
	<h2>Unavailable</h2>
	<ul></ul>
</div>
```

Initiate the lookup by calling the `startSearch()` method with the ID matching the JSON file uploaded to the `data` directory. 

`DOMAINMASHUP.startSearch(id);`

#Ongoing Development

There are various issues that I haven't looked at, such as API limits, error handling, and many more. 

There will be a way of doing this without using the PHP script, such as looking more into why my first attempt using JSONP didn't work, but this was the quickest solution for me, so I went with it.

Further development will be very limited, unless there's a good reason to progress any further with it. Please play around and contribute if you like!

