# LingRef

LingRef is a Handlebars template and accompanying helpers for rendering [Mendeley][Mendeley] references following the [unified stylesheet for linguistics][unified] (mostly).

Created and maintained by [Daniel W. Hieber][DWH] (University of California, Santa Barbara)

Available under an [MIT license][9].

<!-- BADGES -->

[![npm version](https://img.shields.io/npm/v/ling-ref.svg)][npm]
[![npm downloads](https://img.shields.io/npm/dt/ling-ref.svg)][npm]
[![GitHub issues](https://img.shields.io/github/issues/dwhieb/ling-ref.svg)][issues]
[![GitHub license](https://img.shields.io/github/license/dwhieb/ling-ref.svg)][license]
[![GitHub stars](https://img.shields.io/github/stars/dwhieb/ling-ref.svg?style=social)][GitHub]

## Contents

* [Usage](#usage)
* [Options](#option)
* [Getting Mendeley Data](#getting-mendeley-data)
* [Customizing](#customizing)
* [Reporting Issues](#reporting-issues)
* [Running Tests](#running-tests)

## Usage

1. Start by getting your Mendeley references in JSON format. See [Getting Mendeley Data](#getting=mendeley-data) below.

1. Follow the directions for either Node or browser below.

1. Now you can use the LingRef partial in your templates:

```hbs
<ol class=reference-list>
  {{#each references}}
    <li>
      {{> reference data}}
    </li>
  {{/each}}
</ol>
```

### Node

1. Install [Handlebars][Handlebars] and LingRef: `npm i handlebars ling-ref`.

1. Follow the steps in the code below.

```js
const Handlebars = require(`handlebars`);
const helpers    = require(`ling-ref`);
const fs         = require(`fs`);

// Get the LingRef Handlebars template
const reference = fs.readFileSync(`node_modules/ling-ref/reference.hbs`);

// Register the LingRef template as a partial with Handlebars
Handlebars.registerPartial({ reference: template });

// Register the associated helpers with Handlebars
Handlebars.registerHelper(helpers);
```

### Browser

1. [Download the Handlebars library][Handlebars] and save it to your project (or install with npm and use the files in the `node_modules` directory).

1. Download the LingRef library from the [releases page][releases], and copy these two files to your project (or install with npm and use the files in the `node_modules` directory):

  - `dist/helpers.js`
  - `dist/reference.hbs`

1. Include the Handlebars and LingRef scripts in your HTML. This will expose `Handlebars` and `LingRef` as global variables. The `LingRef` variable is a hash of the Handlebars helpers needed for the LingRef template.

```html
<script src=handlebars.min.js></script>
<script src=helpers.js></script>
```

1. Follow the steps in the code below (note that this code is async and needs to be run inside an async function).

```js
// Get the LingRef Handlebars template:
const res      = await fetch(`reference.hbs`);
const template = await res.text();

// Register the LingRef template as a partial with Handlebars
Handlebars.registerPartial({ reference: template });

// Register the LingRef helpers with Handlebars
Handlebars.registerHelper(LingRef);
```


## Getting Mendeley Data

[Mendeley][Mendeley] is a software and service for managing bibliographic sources. Once you have added some sources to your database and synced them with Mendeley, you can retrieve your sources in JSON format from the [Mendeley API][dev].

The easiest way to get your references in JSON format is by using Mendeley's [API explorer][explorer]. Simply log in with your Mendeley credentials, and you can make requests to the Mendeley API. Most likely you will want to make a `GET /documents` request. You can then copy-paste the JSON data from the response.

**IMPORTANT:** Make sure that the `view` parameter is set to `all` when requesting documents, whether using the API explorer or accessing the API programmatically.

You can also access the Mendeley API programmatically, and retrieve documents in realtime before rendering your bibliography. See the [Mendeley developer documentation][dev] for more information. Again, make sure that the `view` parameter is set to `all` when requesting documents, or your data will be missing fields.

# HTML & CSS

Each reference is a single `<p data-key="{{citation_key}}" data-tags="{{tags}}" class=ref>` tag. The `data-key` attribute contains the data from the Citation Key field of the reference. The `data-tags` attribute contains a comma-separated list of the tags for a reference.

# Reporting Issues

Found a bug? Have a suggestion for improvement? Have a question? [Open an issue on GitHub.][issues]

# Running Tests

Open the file `test/index.html` to run the tests. Additional references can be tested by adding them to `test/references.yml`. Each reference that is tested must include an `entry` property, containing the expected text of the citation in the reference list.

<!-- LINKS -->

[API]:        http://dev.mendeley.com
[DWH]:        https://danielhieber.com
[GitHub]:     https://github.com/dwhieb/ling-ref
[explorer]:   https://api.mendeley.com/apidocs/docs
[Handlebars]: http://handlebarsjs.com/
[issues]:     https://github.com/dwhieb/ling-ref/issues
[license]:    https://github.com/dwhieb/ling-ref/blob/master/LICENSE.md
[Mendeley]:   https://www.mendeley.com
[npm]:        https://www.npmjs.com/package/ling-ref
[releases]:   https://github.com/dwhieb/ling-ref/releases
[unified]:    https://www.linguisticsociety.org/resource/unified-style-sheet
