# Quick Start Guide

## Which Script Should I Use?

### Use `generate-meeting-email.js` if:
- ✅ Viewing in web browsers (Chrome, Firefox, Safari, Edge)
- ✅ Using modern email clients (Gmail, Apple Mail, Thunderbird)
- ✅ Need the best visual design with gradients, shadows, modern effects
- ✅ Want smaller file sizes
- ✅ Don't need Outlook compatibility

### Use `generate-outlook-email.js` if:
- ✅ **Sending through Microsoft Outlook** (Desktop or Web)
- ✅ Recipients use Outlook to read emails
- ✅ Need to create an Outlook Template (.oft file)
- ✅ Corporate environment that standardizes on Outlook
- ✅ Need maximum email client compatibility

## Quick Commands

### For Modern Email / Web Viewing:
```bash
node generate-meeting-email.js --json example-meeting.json
```

### For Microsoft Outlook:
```bash
node generate-outlook-email.js --json example-meeting.json
```

## Both Scripts Support:

✅ JSON file input
✅ Interactive mode (no arguments)
✅ Custom output filenames (`--output`)
✅ Same data structure
✅ Help command (`--help`)
✅ Color-coded sections
✅ Automatic URL linking
✅ Responsive design

## File Organization

```
📁 RealtyExperts-Meeting-Notes/
├── 📄 generate-meeting-email.js      ← Modern web version
├── 📄 generate-outlook-email.js      ← Outlook-compatible version
├── 📄 example-meeting.json           ← Sample data (use this!)
├── 📄 template-meeting.json          ← Blank template
├── 📖 README.md                      ← Main documentation
├── 📖 README-OUTLOOK.md              ← Outlook-specific guide
├── 📖 USAGE-EXAMPLES.md              ← Usage examples
└── 📖 QUICK-START.md                 ← This file
```

## Most Common Workflow

1. **Edit your meeting data:**
   ```bash
   # Copy the template
   cp template-meeting.json my-meeting.json

   # Edit with your content
   nano my-meeting.json  # or use any text editor
   ```

2. **Generate the email:**

   For Outlook:
   ```bash
   node generate-outlook-email.js --json my-meeting.json
   ```

   For web/modern clients:
   ```bash
   node generate-meeting-email.js --json my-meeting.json
   ```

3. **Use the output:**
   - Open the HTML file in a browser to preview
   - Copy-paste into Outlook (for Outlook version)
   - Or send the HTML file as an attachment
   - Or save as .oft template for reuse

## JSON Structure Reference

```json
{
  "meeting_title": "Executive Recap & Resources",
  "meeting_date": "1/13/26",
  "guest_speaker": "Bill Harrison, Claudia Muller",
  "overview": [
    "High-level summary point 1",
    "High-level summary point 2"
  ],
  "insights": [
    "💡 Key insight with details",
    "📊 Another teaching point"
  ],
  "media": [
    "📹 Session Recording: https://youtu.be/...",
    "📊 Slides: https://example.com/slides"
  ],
  "toolkit": [
    "🔗 Resource link 1",
    "📱 Template or tool 2"
  ]
}
```

## Tips

1. **Use emojis in insights, media, and toolkit** for visual appeal
2. **Include full URLs** - they'll auto-convert to clickable links
3. **Keep overview items concise** - 1-2 sentences each
4. **Add speaker names** separated by commas for multiple speakers
5. **Preview in browser first** before sending

## Need Help?

- **Outlook-specific help:** See `README-OUTLOOK.md`
- **Usage examples:** See `USAGE-EXAMPLES.md`
- **Full documentation:** See `README.md`
- **Command help:** Run `node generate-outlook-email.js --help`
