/*
 * Copyright (c) 2014 Mark McIntyre.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/*global brackets: false, define: false, JSLINT: false */

/**
 * Provides results from JSLint to the JavaScript code inspector.
 *
 * @author Mark McIntyre (@markmcintyre on GitHub)
 * @module
 */
define(function (require) {

    'use strict';

    var CodeInspection     = brackets.getModule('language/CodeInspection'),
        Editor             = brackets.getModule('editor/Editor').Editor,
        PreferencesManager = brackets.getModule('preferences/PreferencesManager'),
        JSLINT_NAME        = 'JSLint',
        preferences;

    require('thirdparty/jslint/jslint');

    preferences = PreferencesManager.getExtensionPrefs(JSLINT_NAME);

    // Listen for changes to our options and request a re-linting
    // of our file when the options have changed.
    preferences.definePreference('options', 'object', undefined)
        .on('change', function () {
            CodeInspection.requestRun(JSLINT_NAME);
        });

    preferences.definePreference('skipBlankLines', 'boolean', false)
        .on('change', function () {
            CodeInspection.requestRun(JSLINT_NAME);
        });

    /**
     * Retrieves the number of spaces used by the editor as an indent for a given path, regardless of
     * whether TAB or SPACE characters are used.
     *
     * @private
     * @param {string} path - A full pathname to a file open in an editor.
     */
    function getIndentSize(path) {
        return Editor.getUseTabChar(path) ? Editor.getTabSize(path) : Editor.getSpaceUnits(path);
    }

    /**
     * Lints some provided text representing a JavaScript file open in the editor for a given path. Results
     * are returned in the format expected by a CodeInspector.
     *
     * @param {string} text - Some JavaScript text to be linted
     * @param {string} path - A full pathname to a file open in an editor.
     * @return {object} - Linting results.
     */
    function lintFile(text, path) {
        if (preferences.get('skipBlankLines')) {
            text = text.replace(/^[ \t]+$/gm, '');
        }

        var options = preferences.get('options'),
            errorIndex,
            error,
            result;

        // If options were provided, create a new object prototyped off
        // of it, otherwise use an empty object.
        options = options ? Object.create(options) : {};

        if (!options.indent) {
            options.indent = getIndentSize(path);
        }

        // Perform the lint and check for warnings
        if (!JSLINT(text, options)) {

            // Prepare our results object
            result = {
                errors: []
            };

            // For each of our JSLint errors...
            for (errorIndex = 0; errorIndex < JSLINT.errors.length; errorIndex += 1) {

                // Grab our next error
                error = JSLINT.errors[errorIndex];

                if (error) {

                    // We got an error report from JSLint, so let's
                    // push its details onto our results array.
                    result.errors.push({
                        pos: {
                            line: error.line - 1,
                            ch: error.character - 1
                        },
                        message: error.reason,
                        type: CodeInspection.Type.WARNING
                    });

                }

            }

            // Return our results
            return result;

        }

        // Success! There were no warnings
        return null;

    }

    // Register our linting function to the code inspection extension point
    CodeInspection.register('javascript', {
        name: JSLINT_NAME,
        scanFile: lintFile
    });

});
