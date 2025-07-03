# Export Linked File Paths as Text File
## Overview
When working with InDesign documents stored in a cloud account, it’s all too easy to end up with a file full of broken links—especially if the folders containing your images haven’t finished syncing locally. Instead of manually digging through the Links panel and right-clicking each link to “Copy Full Path,” this script automates the entire process. With one click it:

1. Gathers every externally linked graphic’s full file path
2. De-duplicates and sorts the list
3. Opens a native “Save As…” dialog pre-filled with a sensible filename
4. Writes the paths to a single .txt file

You can then open your cloud settings, sync only those exact folders, package your document, and free up local disk space by de-syncing everything else.

## Features
- Exports every linked graphic’s file path: JPEGs, PSDs, PDFs, AI files, etc.
- Skips embedded items: Only external links appear in the list.
- Auto-dedupe & sort: Removes duplicates and sorts alphabetically.
- Native Save As dialog: Pre-populated filename ([DocumentName]_filepaths.txt) with full OS file-browsing.
- UTF-8 & cross-platform line endings: Ensures the .txt opens cleanly on macOS and Windows.
- Final alert: Confirms the number of paths saved and shows the output file location.

## Example Output
If your document has three placed graphics, you might get a file like:
```
/Users/alex/Cloud/MyProject/images/header.jpg
/Users/alex/Cloud/MyProject/images/logo.png
/Users/alex/Cloud/MyProject/photos/team_photo.psd
```

## How to add Script to InDesign Scripts Panel
Save the .jsx file to your InDesign Scripts Panel folder:
### macOS:
```~/Library/Preferences/Adobe InDesign/<version>/<language>/Scripts/Scripts Panel```
### Windows:
```C:\Program Files\Adobe\Adobe InDesign <Year>\Scripts\Scripts Panel```

Tip: Right-click (Win) or Control-click (macOS) any script in the Scripts panel and choose Reveal in Explorer/Finder to jump straight to the folder.

## How to Use the Script
1. Open the InDesign document with broken links.
2. In InDesign go to Window > Utilities > Scripts.
3. Double-click Export_Link_Paths.jsx.
4. In the native “Save As” dialog, confirm or change the suggested filename and choose a folder.
5. Click Save.

When complete, an alert will show how many paths were exported and where the .txt lives.

## Requirements
- Adobe InDesign (tested on InDesign 2024)
- A document with externally linked graphics
- No additional libraries or plugins needed

