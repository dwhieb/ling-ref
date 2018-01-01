# [ling-ref][1]

A Handlebars template and helper that allows linguists to create an HTML bibliography from a set of [Mendeley][4] references, following the [unified stylesheet for linguistics][3]. This is useful for adding a linguistic bibliography to a website.

[View an example bibliography here.][5]

Created and maintained by [Daniel W. Hieber][2] (University of California, Santa Barbara)

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
* [Reporting Issues](#reporting-issues)

## Using in the Browser

1. Get your Mendeley references in JSON format. See [Getting Mendeley Data](#getting-mendeley-data) below.

1. [Download Handlebars][7] and copy it to your project folder.

1. [Download the latest release of ling-ref][6] and copy the contents of the `/dist` folder to your project folder.

1. Add Handlebars and `helpers.bundle.js` (from the ling-ref `/dist` folder) to your page. If your project uses ES6 modules, use `helpers.mjs` instead, making sure your `<script>` tag . Place these before your project's other scripts.

  ```html
  <script src=handlebars.js></script>

  <script src=helpers.bundle.js></script>
  <!-- OR -->
  <script src=helpers.mjs type=application/javascript></script>

  <script src=your-script.js></script>
  ```

  This will make the `Handlebars` and `lingRef` global variables available to your script.

1. Your project's JavaScript will need to do the following:

  - Register the ling-ref `is()` helper with Handlebars:

    ```js
    const { is } = lingRef:
    Handlebars.registerHelper({ is });
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

    // you can also sort or preformat your references here
    references.forEach(data => {
      const html   = compile(data);
      const li     = document.createElement(`li`);
      li.innerHTML = html;
      list.appendChild(li);
    });
    ```

1. [View a complete example of rendering a bibliography using ling-ref here.][9]

1. For more information on rendering templates with Handlebars, [see the Handlebars documentation][8].

## Using with Node

1. Get your Mendeley references in JSON format. See [Getting Mendeley Data](#getting-mendeley-data) below.

1. Install Handlebars in your project:

  ```
  npm i --save handlebars ling-ref
  ```

1. [Download the latest release of ling-ref][6] and copy the contents of the `/dist` folder to your project folder.

1. Your Node script will then need to do the following:

  - Import Handlebars, the Handlebars helpers, and the Handlebars template using `require()` (or ES6 imports):

    ```js
    const Handlebars = require('handlebars');
    const helpers    = require('helpers.bundle.js');
    const template   = require('reference.hbs');
    ```

  - Register the ling-ref `is()` helper with Handlebars:

    ```js
    const { is } = lingRef:
    Handlebars.registerHelper({ is });
    ```

  - Register the `reference.hbs` as a partial with Handlebars:

    ```js
    Handlebars.registerPartial({ reference: template });
    ```

1. Now you can use the partial in your server-side templates:

  ```hbs
  <ol class=reference-list>
    {{#each references}}
      {{> reference}}
    {{/each}}
  </ol>
  ```

## Getting Mendeley Data

[Mendeley][4] is a software and service for managing bibliographic sources. Once you have added some sources to your database and synced them with Mendeley, you can retrieve your sources in JSON format from the [Mendeley API][10].

The easiest way to get your references in JSON format is by using Mendeley's [API explorer][11]. Simply log in with your Mendeley credentials, and you can make requests to the Mendeley API. Most likely you will want to make a `GET /documents`. You can then copy-paste the JSON data from the response.

**IMPORTANT:** Make sure that the `view` parameter is set to `all` when requesting documents, whether using the API explorer or accessing the API programmatically.

You can also access the Mendeley API programmatically, and retrieve documents in realtime before rendering your bibliography. See the [Mendeley developer documentation][10] for more information. Again, make sure that the `view` parameter is set to `all` when requesting documents, or your data will be missing fields.

# Reporting Issues
Found a bug? Have a suggestion for improvement? Have a question? [Open an issue on GitHub.][12]

<!-- LINKS -->
[1]: https://github.com/dwhieb/ling-ref#readme
[2]: https://danielhieber.com
[3]: https://www.linguisticsociety.org/resource/unified-style-sheet
[4]: https://www.mendeley.com
[5]: https://danielhieber.com/bibliographies/flexibility
[6]: https://github.com/dwhieb/ling-ref/releases
[7]: http://handlebarsjs.com/installation.html
[8]: http://handlebarsjs.com/
[9]: https://github.com/dwhieb/ling-ref/blob/master/test/index.js
[10]: http://dev.mendeley.com
[11]: https://api.mendeley.com/apidocs/docs
[12]: https://github.com/dwhieb/ling-ref/issues
[13]: https://github.com/dwhieb/ling-ref/blob/master/LICENSE
[14]: https://www.npmjs.com/package/ling-ref
