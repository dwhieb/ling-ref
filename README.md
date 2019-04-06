# LingRef

LingRef is a Handlebars template and JavaScript library for rendering [Mendeley][Mendeley] references following the [unified stylesheet for linguistics][unified].

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

1. Get your Mendeley references in JSON format. See [Getting Mendeley Data](#getting=mendeley-data) below.

1. Install [Handlebars][Handlebars]: `npm i handlebars`.

1. Install LingRef: `npm i ling-ref`.

1. Import the LingRef library and create a new `LingRef` instance, passing it any options you'd like to set. See the [Options](#options) section below for a complete list of available options.

```js
const LingRef = require(`ling-ref`)
const lingRef = new LingRef(/* optional options object here */);
```

1. Compile a Mendeley reference to HTML using `lingRef.compile()`.

```js
const html = lingRef.compile(reference);
```

1. Since `LingRef` also registers the reference template as a partial with Handlebars, you can use it in your own templates:

```hbs
<ol class=reference-list>
  {{#each references}}
    {{> reference}}
  {{/each}}
</ol>
```

# Options

The following options may be passed to the Handlebars context when rendering the template, to affect how the reference is displayed.

Option      | Default            | Description
----------- | ------------------ | -----------
abstract    | `false`            | Whether to render the `"abstract"` field of the reference
details     | `false`            | Whether to wrap the citation in a `<details>` element rather than a `<section>` element. If set to `true`, the citation itself will also be placed within a `<summary>` element rather than a `<p>` element.
expanded    | `true`             | Whether the details element should start as open or closed
handlebars  | `Handlebars`       | The Handlebars instance to register the partial with. If none is passed, jschemer attempts to import the Handlebars library.
headerLevel | `"h4"`             | Which level (`h1` - `h6`) of header to use for the Notes and Abstracts headers.
initials    | `false`            | Whether to display only the first initials of the author
notes       | `false`            | Whether to render the `"notes"` field of the reference
partial     | `"reference"`      | The name to use for the partial when registering the jschemer template with Handlebars
template    | `"reference.hbs"`  | The path to the Handlebars reference template

## Getting Mendeley Data

[Mendeley][Mendeley] is a software and service for managing bibliographic sources. Once you have added some sources to your database and synced them with Mendeley, you can retrieve your sources in JSON format from the [Mendeley API][dev].

The easiest way to get your references in JSON format is by using Mendeley's [API explorer][explorer]. Simply log in with your Mendeley credentials, and you can make requests to the Mendeley API. Most likely you will want to make a `GET /documents` request. You can then copy-paste the JSON data from the response.

**IMPORTANT:** Make sure that the `view` parameter is set to `all` when requesting documents, whether using the API explorer or accessing the API programmatically.

You can also access the Mendeley API programmatically, and retrieve documents in realtime before rendering your bibliography. See the [Mendeley developer documentation][dev] for more information. Again, make sure that the `view` parameter is set to `all` when requesting documents, or your data will be missing fields.

**NOTE:** `LingRef` will automatically parse HTML or Markdown that you include in the title, notes, or abstract fields of the reference.

# HTML & CSS

By default, each reference is wrapped in a `<section data-key="{{citation_key}}" class=ref>` tag. Inside this tag are:

  - `<p class=citation>` - The actual citation for the reference. References that have URLs will add a `(link)` text to the end of the citation, with a link to the first URL in the `websites` field.

  - `<section class=abstract>` - The abstract for that reference, if present.

  - `<section class=notes>` - The notes for that reference, if present.

If the `details` option is set to `true`, the reference will be wrapped in a `<details data-key="{{citation_key}}" class=ref>` tag instead of a `<section>` tag, and the citation will be a `<summary class=citation>` element rather than a `<section>` element. This allows users to expand / collapse individual references for more information. It also allows you to decide at the level of the individual reference whether you prefer the reference to be collapsible or not.

Markdown text (including HTML) is supported in the title, abstract, and notes fields section. Both sections also contain an `<h4>` header with the text `Abstract` and `Notes` respectively.

# Reporting Issues

Found a bug? Have a suggestion for improvement? Have a question? [Open an issue on GitHub.][issues]

# Running Tests

Run `npm test` from the command line. This will run tests on the JavaScript portion of the library in Node.

Open the file `test/index.html` to run the manual tests on the generated HTML.

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
