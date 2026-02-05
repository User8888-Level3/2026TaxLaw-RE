# REALTY EXPERTS Meeting Notes Email Generator

Professional HTML email generator for meeting notes with branded REALTY EXPERTS styling.

## Two Versions Available

### 🌐 Modern Web Version (`generate-meeting-email.js`)
For modern email clients and web browsers with full CSS support.

### 📧 Outlook Version (`generate-outlook-email.js`)
**NEW!** Outlook-compatible version with table-based layout for Microsoft Outlook.

See `QUICK-START.md` to choose which version you need.

## Features

- Multiple input methods (JSON file, interactive prompts)
- Color-coded sections for easy reading
- Responsive HTML email design
- Professional branding with gradient header
- Automatic URL linking
- Summary output with statistics
- Outlook template (.oft) support

## Installation

No additional dependencies required - uses Node.js built-in modules.

## Usage

### Method 1: JSON File Input (Recommended)

```bash
node generate-meeting-email.js --json example-meeting.json
```

### Method 2: Custom Output Filename

```bash
node generate-meeting-email.js --json meeting-data.json --output team-meeting.html
```

### Method 3: Interactive Mode

```bash
node generate-meeting-email.js
```

Follow the prompts to enter meeting information.

### Get Help

```bash
node generate-meeting-email.js --help
```

## JSON File Format

```json
{
  "meeting_title": "Weekly Team Sync",
  "meeting_date": "February 3, 2026",
  "attendees": "John Doe, Jane Smith, Bob Johnson",
  "agenda": [
    "Review Q1 goals",
    "Discuss new listings"
  ],
  "decisions": [
    "Approved marketing budget"
  ],
  "actions": [
    "@John - Prepare report by Feb 10",
    "@Jane - Schedule follow-up"
  ],
  "highlights": [
    "Strong market performance in downtown area"
  ]
}
```

## Output

The script generates:
- HTML email file with professional formatting
- Subject line suggestion
- Console summary with item counts

## Email Sections

- 📋 **Agenda** (Blue) - Meeting topics and discussion points
- ✅ **Key Decisions** (Green) - Important decisions made
- 🎯 **Action Items** (Orange) - Tasks assigned with owners
- 💡 **Discussion Highlights** (Purple) - Notable insights and discussions

## Examples

See `example-meeting.json` for a complete example.

## Tips

- Use `@Person` format in action items to clearly indicate ownership
- Include deadlines in action items for accountability
- Keep highlights concise and actionable
- The generated HTML can be copy-pasted into email clients or sent as an attachment

## Microsoft Outlook Users

If you're using **Microsoft Outlook**, use the Outlook-optimized version:

```bash
node generate-outlook-email.js --json example-meeting.json
```

This version uses table-based layouts and is fully compatible with Outlook 2016/2019/365. You can save the output as an `.oft` template file for reuse.

**📖 Full Outlook Guide:** See `README-OUTLOOK.md` for detailed instructions on:
- Creating Outlook templates (.oft files)
- Copy-paste workflow for Outlook
- Known limitations and workarounds
- Troubleshooting tips
