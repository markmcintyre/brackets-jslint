brackets-jslint
===============

A Brackets extension to enable JSLint linting support for JavaScript. This extension uses the 2014-07-08 release of [Douglas Crockford's JSLint](http://www.jslint.com/) tool.

Frequently Asked Questions
--------------------------

##### Doesn't Brackets already support JSLint?
Yes, but the version of JSLint included out-of-the-box is outdated (2012-01-13) and likely to be removed entirely in a future release now that Brackets supports pluggable linters.

##### How do I configure JSLint?
Configuration parameters are documented on Douglas Crockford's [JSLint instructions website](http://www.jslint.com/lint.html). If you don't want to specify linter directives inline, you can also include them in your `.brackets.json` file, as outlined below.

##### Is there support for a .jslintrc?
No, this is not a standard feature of JSLint, so other IDEs and build processes would be unlikely to support it. However, if you understand the risks, you're welcome to specify project-level linting options inside your project's `.brackets.json` file. For example:

```javascript
{
    "JSLint.options": {
        "browser": true
    }
}
```

##### Does this extension assume a browser environment?
No. While the original JSLint support in Brackets did this, it's not a default functionality in JSLint, and I'd like this extension to stick as closely to the out-of-the-box JSLint behaviour as possible. If you would like to enable browser environment globals for your whole project, you can set your project options to your liking as described in the above section.
