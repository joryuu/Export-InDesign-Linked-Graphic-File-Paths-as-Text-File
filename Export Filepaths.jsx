/**
 * Export the full file-paths of every linked graphic
 * in the current InDesign document, using a pre-filled
 * “Save As” dialog.
 */

(function () {
    if (app.documents.length === 0) {
        alert("Please open a document first.");
        return;
    }

    var doc   = app.activeDocument,
        links = doc.links,
        paths = [];

    // 1) Gather all external filePaths
    for (var i = 0; i < links.length; i++) {
        var ln = links[i];
        if (ln.status === LinkStatus.LINK_EMBEDDED) continue;
        try {
            paths.push(ln.filePath);
        } catch (_) {}
    }

    if (!paths.length) {
        alert("No linked graphics with external file paths were found.");
        return;
    }

    // 2) De-dupe & sort
    var seen   = {},
        unique = [];
    for (var j = 0; j < paths.length; j++) {
        if (!seen[paths[j]]) {
            seen[paths[j]] = true;
            unique.push(paths[j]);
        }
    }
    unique.sort();
    paths = unique;

    // 3) Build a default File in the same folder as the document
    var docFile     = doc.fullName,              // the .indd File object
        parentPath  = docFile.parent.fsName,     // its folder
        docName     = doc.name,
        dot         = docName.lastIndexOf("."),
        baseName    = (dot > 0) ? docName.substring(0, dot) : docName,
        defaultFile = new File(parentPath + "/" + baseName + "_filepaths.txt");

    // 4) Use the instance method saveDlg() to get a native “Save As…” with filename pre-filled
    var saveFile = defaultFile.saveDlg(
        "Save linked-file paths as…",
        "Text file:*.txt"
    );
    if (!saveFile) return;  // user cancelled

    // 5) Ensure .txt extension
    if (!/\.txt$/i.test(saveFile.name)) {
        saveFile = new File(saveFile.fsName + ".txt");
    }

    // 6) Write out
    try {
        saveFile.encoding = "UTF-8";
        saveFile.open("w");
        saveFile.write(paths.join("\r"));  // CR for cross-platform
        saveFile.close();
        alert(
            "Export complete!\r" +
            paths.length + " file paths saved to:\r" +
            saveFile.fsName
        );
    } catch (err) {
        alert("Couldn’t write the file:\r" + err.message);
    }
})();
