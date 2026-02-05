# Usage Examples

## Quick Start

Generate a meeting notes email from the example file:
```bash
node generate-meeting-email.js --json example-meeting.json
```

## All Usage Methods

### 1. Basic JSON Input
```bash
node generate-meeting-email.js --json example-meeting.json
```

### 2. JSON Input with Custom Output Name
```bash
node generate-meeting-email.js --json example-meeting.json --output team-sync-feb-3.html
```

### 3. Interactive Mode (No Arguments)
```bash
node generate-meeting-email.js
```
Then follow the prompts to enter:
- Meeting title
- Meeting date
- Attendees
- Agenda items (press Enter twice when done)
- Key decisions (press Enter twice when done)
- Action items (press Enter twice when done)
- Discussion highlights (press Enter twice when done)

### 4. Display Help
```bash
node generate-meeting-email.js --help
```

## Creating Your Own Meeting Data

Create a JSON file (e.g., `my-meeting.json`):

```json
{
  "meeting_title": "Client Review Meeting",
  "meeting_date": "February 5, 2026",
  "attendees": "Alice Johnson, Bob Smith",
  "agenda": [
    "Review current listings",
    "Discuss pricing strategy"
  ],
  "decisions": [
    "Reduce price on 456 Oak Street by 5%"
  ],
  "actions": [
    "@Alice - Update listing photos by Feb 7",
    "@Bob - Prepare market analysis by Feb 10"
  ],
  "highlights": [
    "Strong interest in waterfront properties",
    "Need more 3-bedroom units in portfolio"
  ]
}
```

Then run:
```bash
node generate-meeting-email.js --json my-meeting.json
```

## Output Files

The script automatically generates filenames like:
- `meeting-notes-weekly-team-sync-q1-planning-2026-02-04.html`

Or use `--output` to specify your own:
- `team-meeting.html`
- `client-review-feb-5.html`
- `weekly-sync.html`

## Using the Generated Email

### Option 1: Open in Browser
Simply double-click the generated `.html` file to preview it.

### Option 2: Copy HTML for Email
1. Open the `.html` file in a text editor
2. Copy all the HTML content
3. Paste into your email client's HTML editor

### Option 3: Attach to Email
Attach the `.html` file to your email as an attachment.

## Tips for Best Results

### Action Items Format
Use the `@Person - Task by Date` format for clarity:
```
@John - Send proposal to client by Feb 10
@Sarah - Book conference room by Feb 8
@Team - Review documents by Feb 15
```

### Dates
Use readable date formats:
- "February 3, 2026" ✓
- "Feb 3, 2026" ✓
- "2026-02-03" ✓

### Attendees
Comma-separated list:
- "John Doe, Jane Smith, Bob Johnson" ✓

### Empty Sections
If you don't have items for a section, use an empty array:
```json
{
  "agenda": [],
  "decisions": ["Decision 1"],
  "actions": [],
  "highlights": []
}
```

## Troubleshooting

### Error: Cannot find JSON file
- Check the file path is correct
- Make sure the file exists in the current directory
- Use absolute or relative paths: `--json ./data/meeting.json`

### Error: Invalid JSON
- Validate your JSON file at jsonlint.com
- Check for missing commas or quotes
- Ensure arrays use `[]` and objects use `{}`

### Missing Output File
- Check the console output for the actual filename
- The file is created in the current directory
- Use `--output` to specify a custom location
