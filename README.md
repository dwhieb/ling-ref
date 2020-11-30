# ling-ref

ling-ref is a small JavaScript library (browser / Node) for converting [Mendeley][Mendeley] documents to a citation in HTML following the [Unified Stylesheet for Linguistics][Unified].

This library is useful for any linguist who uses Mendeley as their bibliography management software and would like to create a presentation format of their bibliography in Markdown or HTML.

Found a bug? [Open an issue on GitHub.][new-issue]

_Created and maintained by [Daniel W. Hieber][me]._

[![npm](https://img.shields.io/npm/dt/ling-ref)][npm]
[![GitHub issues](https://img.shields.io/github/issues/dwhieb/ling-ref)][issues]
[![GitHub release](https://img.shields.io/github/v/release/dwhieb/ling-ref)][releases]
[![tests](https://github.com/dwhieb/ling-ref/workflows/tests/badge.svg)][tests]
[![license](https://img.shields.io/github/license/dwhieb/ling-ref.svg)][license]
[![GitHub stars](https://img.shields.io/github/stars/dwhieb/ling-ref.svg?style=social)][GitHub]

## Getting Mendeley Data

Before using this library, you will need to get your Mendeley references in JSON format. [Mendeley][Mendeley] is a software and service for managing bibliographic sources. Once you have added references to your database, you can retrieve those references in JSON format using the [Mendeley API][Mendeley-API].

The easiest way to get your Mendeley references into JSON format is by using [Mendeley's API explorer][Mendeley-explorer]. Simply log in with your Mendeley credentials, and you can make requests to the Mendeley API. Most likely you will want to make a `GET /documents` request. You can then copy-paste the JSON data from the response.

You can also access the Mendeley API programmatically. See the [Mendeley developer documentation][Mendeley-API] for more information.

**Important:** Make sure that the `view` parameter is set to `all` when requesting documents, whether using the API programmatically or using the API explorer.

## Usage

Start by getting your Mendeley references in JSON format (see above).

Install the library:

```cmd
npm install -D ling-ref
yarn add --dev ling-ref
```

ling-ref exports a single function which converts a Mendeley reference to a citation in HTML:

```js
// import the ling-ref library
import convertReference from 'ling-ref';

// get your Mendeley documents in JSON format
const references = getMendeleyReferences();

// convert each reference to an HTML citation
const citations = references.map(convertReference);

// add the citations to your HTML
const referenceList = document.querySelector(`ul#reference-list`);

citations.forEach(citation => {
  const p = document.createElement(`p`);
  p.textContent = citation;
  referenceList.appendChild(p);
});
```

<!-- Links -->

[GitHub]:            https://github.com/dwhieb/ling-ref
[issues]:            https://github.com/dwhieb/ling-ref/issues
[new-issue]:         https://github.com/dwhieb/ling-ref/issues/new
[license]:           https://github.com/dwhieb/ling-ref/blob/main/LICENSE.md
[Mendeley]:          https://www.mendeley.com/
[Mendeley-API]:      https://dev.mendeley.com/
[Mendeley-explorer]: https://api.mendeley.com/apidocs/docs
[me]:                https://github.com/dwhieb
[npm]:               https://www.npmjs.com/package/ling-ref
[releases]:          https://github.com/dwhieb/ling-ref/releases
[tests]:             https://github.com/dwhieb/ling-ref/actions
[Unified]:           https://www.linguisticsociety.org/resource/unified-style-sheet
