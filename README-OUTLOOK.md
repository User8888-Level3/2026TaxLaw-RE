# Outlook Email Template Generator

This guide explains how to generate and use Outlook-compatible meeting notes emails.

## Quick Start

Generate an Outlook-compatible email:
```bash
node generate-outlook-email.js --json example-meeting.json
```

## Why a Separate Outlook Version?

Outlook uses a different HTML rendering engine than web browsers. It requires:
- Table-based layouts (no CSS Grid or Flexbox)
- Inline styles only (ignores `<style>` blocks)
- VML for gradients in Outlook 2007-2016
- Simplified CSS properties
- Specific meta tags and conditional comments

## Usage

### Method 1: Generate from JSON File
```bash
node generate-outlook-email.js --json example-meeting.json
```

### Method 2: Custom Output Filename
```bash
node generate-outlook-email.js --json your-data.json --output my-email.html
```

### Method 3: Interactive Mode
```bash
node generate-outlook-email.js
```
Follow the prompts to enter meeting information.

## How to Import into Outlook

### Option A: Copy-Paste Method (Quick)

1. **Generate the HTML file:**
   ```bash
   node generate-outlook-email.js --json example-meeting.json
   ```

2. **Open the HTML file** in your web browser (Chrome, Firefox, Safari, Edge)

3. **Select All content** (Ctrl+A or Cmd+A)

4. **Copy** (Ctrl+C or Cmd+C)

5. **Open Outlook** and create a new email

6. **Paste** into the email body (Ctrl+V or Cmd+V)
   - The formatting should transfer correctly
   - Images will load from the URLs

7. **Send or Save** as needed

### Option B: Save as Outlook Template (.oft file)

This method creates a reusable template you can use for future meetings.

#### For Outlook Desktop (Windows):

1. **Generate the HTML file**

2. **Open Outlook** and create a new email

3. **Copy-paste the HTML** content into the email (see Option A, steps 2-6)

4. Click **File → Save As**

5. In "Save as type" dropdown, select **Outlook Template (*.oft)**

6. Choose a location and name: `REALTY-EXPERTS-Meeting-Notes.oft`

7. Click **Save**

**To use the template:**
- Double-click the `.oft` file
- A new email opens with your template
- Update the content as needed
- Send

#### For Outlook Desktop (Mac):

1. **Generate the HTML file**

2. **Open Outlook** and create a new email

3. **Copy-paste the HTML** content into the email

4. Click **File → Save As Template**

5. Name the template: `REALTY EXPERTS Meeting Notes`

6. Click **Save**

**To use the template:**
- In Outlook, click **New Email**
- Click **Insert → My Templates**
- Select your saved template
- Update content and send

#### For Outlook Web (outlook.com / Office 365):

Outlook Web doesn't support .oft files, but you can:

1. **Create a draft email** with the HTML content
2. **Save it as a draft** in a specific folder
3. **Copy that draft** when you need to send meeting notes

Or use the **Quick Steps** feature:
1. In Outlook Web, go to **Settings → Mail → Rules**
2. Create a custom rule or quick step
3. However, templates are best managed in Outlook Desktop

## Creating an Editable Template

If you want to create a template with placeholder text that you can easily update:

1. **Edit `template-meeting.json`** with placeholder values:
   ```json
   {
     "meeting_title": "Executive Recap & Resources",
     "meeting_date": "[DATE]",
     "guest_speaker": "[SPEAKER NAME]",
     "overview": ["[Add overview items here]"],
     "insights": ["[Add insights here]"],
     "media": ["📹 Recording: [URL]"],
     "toolkit": ["[Add toolkit items here]"]
   }
   ```

2. **Generate the template:**
   ```bash
   node generate-outlook-email.js --json template-meeting.json --output template.html
   ```

3. **Save as .oft file** following the steps above

4. **When using the template:**
   - Open the .oft file
   - Search and replace `[DATE]`, `[SPEAKER NAME]`, etc.
   - Update the content arrays
   - Send

## Outlook Compatibility

### Tested and Working:
✅ Outlook 2016 (Windows)
✅ Outlook 2019 (Windows)
✅ Outlook 365 (Windows)
✅ Outlook for Mac 2016+
✅ Outlook Web (outlook.com)
✅ Outlook Mobile (iOS/Android)

### Known Limitations:

1. **Gradients**: Outlook 2007-2016 doesn't fully support CSS gradients. The script uses VML for basic gradient support, but defaults to solid colors for maximum compatibility.

2. **Border Radius**: Rounded corners may appear as square corners in Outlook 2007-2013.

3. **Box Shadows**: Not supported in Outlook 2007-2016. Removed from Outlook version.

4. **Web Fonts**: Outlook uses system fonts only. The template uses Arial/Sans-serif for consistency.

5. **Hover Effects**: Not supported in email clients. Removed from Outlook version.

6. **Max-Width**: Older Outlook versions don't support max-width. The template uses fixed widths with table width attributes.

## Troubleshooting

### Images Not Displaying

**Problem:** Logo or feature image shows as broken
**Solution:**
- Ensure images are hosted at publicly accessible URLs
- Check your Outlook security settings: File → Options → Trust Center → Automatic Download
- Enable "Download pictures from the Internet"

### Formatting Looks Wrong

**Problem:** Layout appears broken or misaligned
**Solution:**
- Make sure you're copying from a web browser, not from a text editor
- Use Chrome, Firefox, or Edge to open the HTML (not Notepad)
- In Outlook, paste using Ctrl+V (not "Paste Special")

### Colors Not Showing

**Problem:** Sections appear without color coding
**Solution:**
- This is rare but can happen in very old Outlook versions
- The content is still readable, just without color coding
- Upgrade to Outlook 2016 or newer for best results

### Template Changes Not Saving

**Problem:** Edits to .oft file don't persist
**Solution:**
- Make sure you're clicking "Save" after editing the template
- Check file permissions on the .oft file location
- Re-generate the template from scratch if needed

## Advanced: Customizing the Template

### Change Brand Colors

Edit `generate-outlook-email.js` and modify the `BRAND` object:

```javascript
const BRAND = {
  name: 'YOUR COMPANY',
  primaryColor: '#1e3a8a',  // Change this
  accentColor: '#2563eb',    // Change this
  lightAccent: '#3b82f6',    // Change this
  logoUrl: 'https://your-domain.com/logo.jpg',
  featureImageUrl: 'https://your-domain.com/feature.jpg'
};
```

### Change Section Colors

Edit the `COLORS` object:

```javascript
const COLORS = {
  overview: '#2563eb',   // Blue - change to your color
  insights: '#16a34a',   // Green - change to your color
  media: '#ea580c',      // Orange - change to your color
  toolkit: '#9333ea'     // Purple - change to your color
};
```

### Remove Feature Image

If you don't want the market update image:

1. Open `generate-outlook-email.js`
2. Find the "Feature Image" comment
3. Delete or comment out that entire table section

## Support

For issues or questions:
1. Check that your JSON file is valid at jsonlint.com
2. Verify image URLs are publicly accessible
3. Test the HTML file in a web browser first
4. Ensure you're using Outlook 2016 or newer

## Differences from Web Version

The Outlook version (`generate-outlook-email.js`) differs from the web version (`generate-meeting-email.js`):

| Feature | Web Version | Outlook Version |
|---------|-------------|-----------------|
| Layout | CSS Grid/Flexbox | Tables |
| Styles | External + Inline | Inline Only |
| Gradients | CSS Linear Gradient | VML + Solid Colors |
| Shadows | Yes | No |
| Rounded Corners | Yes | Limited |
| Hover Effects | Yes | No |
| Font Support | Web Fonts | System Fonts Only |
| File Size | Smaller | Larger (more markup) |

Both versions produce the same visual output when viewed in their respective environments.
