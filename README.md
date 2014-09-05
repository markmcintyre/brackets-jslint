brackets-jslint
===============

A Brackets extension to enable JSLint linting support for JavaScript. This extension uses the 2014-07-08 release of [Douglas Crockford's JSLint](http://www.jslint.com/) tool.

Frequently Asked Questions
--------------------------

##### Doesn't Brackets already support JSLint?
Yes, but the version of JSLint included out-of-the-box is outdated (2012-01-13) and likely to be removed entirely in a future release now that Brackets supports pluggable linters.

##### How do I configure this extension?
The JSLint extension accepts two preferences, which can be configured in your `.brackets.json` file:

1. **skipBlankLines:** Set this preference to `true` to ignore any warnings regarding lines that only contain whitespace characters (such as spaces and tabs). This preference defaults to `false`.
2. **options:** This preference should contain an object defining standard JSLint key/value configuration options. This defaults to an empty object.

Here's an example configuration for reference:
```javascript
{
    "JSLint.skipBlankLines": true,
    "JSLint.options": {
        "vars": true,
        "browser": true
    }
}
```

##### How do I configure JSLint?
Configuration parameters are documented on Douglas Crockford's [JSLint instructions website](http://www.jslint.com/lint.html). The accepted practice is to simply specify your options inline using JSLint directives. If you don't want to specify these inline, however, you can also include them in your `.brackets.json` file using the `options` preference, outlined above.

##### Is there support for a .jslintrc?
Although other linting tools provide a similar feature, this is not a standard feature of JSLint, so other IDEs and build processes would be unlikely to support it. However, if you understand the risks, you're welcome to specify project-level linting options inside your project's `.brackets.json` file, and they'll be applied to each of your project's files.

##### Does this extension assume a browser environment?
No. While the original JSLint support in Brackets did this, it's not a default functionality in JSLint, and I'd like this extension to stick as closely to the out-of-the-box JSLint behaviour as possible. If you would like to enable browser environment globals for your whole project, you can set your project options to your liking as described in the above section.