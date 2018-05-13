# [ling-ref][1]

ling-ref is a Handlebars template that allows linguists to create an HTML bibliography from a set of [Mendeley][4] references, following the [unified stylesheet for linguistics][3]. This is useful for adding a linguistic bibliography to a website.

[View an example bibliography here.][5]

Created and maintained by [Daniel W. Hieber][2] (University of California, Santa Barbara)

Available under an [MIT license][9].

<!-- BADGES -->
<!-- Informational -->
[![npm](https://img.shields.io/npm/v/ling-ref.svg)][14]
[![npm](https://img.shields.io/npm/dt/ling-ref.svg)][14]
[![GitHub issues](https://img.shields.io/github/issues/dwhieb/ling-ref.svg)][12]
[![GitHub license](https://img.shields.io/github/license/dwhieb/ling-ref.svg)][13]

<!-- Social -->
[![GitHub stars](https://img.shields.io/github/stars/dwhieb/ling-ref.svg?style=social)](https://github.com/dwhieb/ling-ref/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/dwhieb/ling-ref.svg?style=social)](https://github.com/dwhieb/ling-ref/network)

## Contents

* [Using in the Browser](#using-in-the-browser)
* [Using in Node](#using-in-node)
* [Getting Mendeley Data](#getting-mendeley-data)
* [HTML & Styling](#html--styling)
* [Reporting Issues](#reporting-issues)
* [Running Tests](#running-tests)

## Using in the Browser

1. Get your Mendeley references in JSON format. See [Getting Mendeley Data](#getting-mendeley-data) below.

1. [Download Handlebars][7] and copy it to your project folder.

1. [Download the latest release of ling-ref][6] and copy the contents of the `/dist` folder to your project. Rename the folder to something identifiable such as `/lingref`.

1. Add the Handlebars and ling-ref scripts to your page, before your project's other scripts. This will make the `Handlebars` and `lingRef` objects available as global variables.

  ```html
  <script src=handlebars.js></script>
  <script src=lingref/index.js></script>
  <script src=your-script.js></script>
  ```

1. Your project's JavaScript will need to do each of the following. Simple code examples are given for each step.

  - Pass the Handlebars instance to lingRef to register the necessary helpers with Handlebars:

    ```js
    lingRef(Handlebars):
    ```

  - Fetch the `reference.hbs` template:

    ```js
    const res      = await fetch(`reference.hbs`);
    const template = await res.text();
    ```

  - Compile the template:

    ```js
    const compile = Handlebars.compile(template);
    ```

  - Render the template once for each Mendeley reference:

    ```js
    const list = document.getElementById(`reference-list`);

    // You can also sort or preformat your references here
    references.forEach(data => {
      const html   = compile(data);
      const li     = document.createElement(`li`);
      li.innerHTML = html;
      list.appendChild(li);
    });
    ```

## Using with Node

1. Get your Mendeley references in JSON format. See [Getting Mendeley Data](#getting-mendeley-data) below.

1. Install Handlebars and ling-ref in your project:

  ```
  npm i handlebars ling-ref
  ```

1. Your Node script will then need to do the following:

  - Import Handlebars and ling-ref:

    ```js
    const Handlebars = require('handlebars');
    const lingRef    = require('ling-ref');
    ```

  - Pass the Handlebars instance to lingRef to register the necessary helpers:

    ```js
    lingRef(Handlebars):
    ```

  - Read the `reference.hbs` file from ling-ref's `/src` folder, and register it as a partial with Handlebars:

    ```js
    const reference = fs.readFileSync(`node_modules/ling-ref/src/reference.hbs`, `utf8`);

    Handlebars.registerPartial({ reference });
    ```

1. Now you can use the reference partial in your server-side templates:

  ```hbs
  <ol class=reference-list>
    {{#each references}}
      {{> reference}}
    {{/each}}
  </ol>
  ```

## Getting Mendeley Data

[Mendeley][4] is a software and service for managing bibliographic sources. Once you have added some sources to your database and synced them with Mendeley, you can retrieve your sources in JSON format from the [Mendeley API][10].

The easiest way to get your references in JSON format is by using Mendeley's [API explorer][11]. Simply log in with your Mendeley credentials, and you can make requests to the Mendeley API. Most likely you will want to make a `GET /documents` request. You can then copy-paste the JSON data from the response.

**IMPORTANT:** Make sure that the `view` parameter is set to `all` when requesting documents, whether using the API explorer or accessing the API programmatically.

You can also access the Mendeley API programmatically, and retrieve documents in realtime before rendering your bibliography. See the [Mendeley developer documentation][10] for more information. Again, make sure that the `view` parameter is set to `all` when requesting documents, or your data will be missing fields.

# HTML & Styling

The HTML in the reference template has several classes applied that you can use to add CSS styling. Each citation is a `<details data-key="{{citation_key}}" class=ref>` element. Inside the `<details>` element are:

  - `<summary class=citation>` - The actual citation for that reference.

  - `<section class=abstract>` - The abstract for that reference, if present.

  - `<section class=notes>` - The notes for that reference, if present.

Markdown text (including HTML) is supported in both the Abstract and Notes section.

# Reporting Issues
Found a bug? Have a suggestion for improvement? Have a question? [Open an issue on GitHub.][12]

# Running Tests

Run `npm test` from the command line. This will run tests on the JavaScript portion of the library in Node, and then start a local server. Then navigate to `http://localhost:3000/` in your browser to view a sample reference list generated using the ling-ref library. Enter `Ctrl + C` on the command line to stop the server.

<!-- LINKS -->
[1]: https://github.com/dwhieb/ling-ref#readme
[2]: https://danielhieber.com
[3]: https://www.linguisticsociety.org/resource/unified-style-sheet
[4]: https://www.mendeley.com
[5]: https://danielhieber.com/bibliographies/flexibility
[6]: https://github.com/dwhieb/ling-ref/releases
[7]: http://handlebarsjs.com/installation.html
[8]: http://handlebarsjs.com/
[9]: https://opensource.org/licenses/MIT
[10]: http://dev.mendeley.com
[11]: https://api.mendeley.com/apidocs/docs
[12]: https://github.com/dwhieb/ling-ref/issues
[13]: https://github.com/dwhieb/ling-ref/blob/master/LICENSE
[14]: https://www.npmjs.com/package/ling-ref
