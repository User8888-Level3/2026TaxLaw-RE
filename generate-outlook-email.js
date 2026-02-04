#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * REALTY EXPERTS Meeting Notes Email Generator - Outlook Compatible
 * Generates Outlook-compatible HTML email for meeting notes
 * Uses table-based layout with inline styles for maximum compatibility
 */

const COLORS = {
  overview: '#2563eb',      // blue
  insights: '#16a34a',      // green
  media: '#ea580c',         // orange
  toolkit: '#9333ea'        // purple
};

const BRAND = {
  name: 'REALTY EXPERTS',
  primaryColor: '#1e3a8a',
  accentColor: '#2563eb',
  lightAccent: '#3b82f6',
  logoUrl: 'https://harvinder.dscloud.me/blog/wp-content/uploads/2026/02/2026_real_estate_market_update_tax_law_and_lending_trends.jpg',
  featureImageUrl: 'https://harvinder.dscloud.me/blog/wp-content/uploads/2026/02/2026_real_estate_market_update_tax_law_and_lending_trends.jpg'
};

/**
 * Generate Outlook-compatible HTML email from meeting data
 */
function generateOutlookHTML(data) {
  const sections = [];

  // Executive Overview section
  if (data.overview && data.overview.length > 0) {
    sections.push(generateSection('📊 Executive Overview', data.overview, COLORS.overview));
  } else if (data.agenda && data.agenda.length > 0) {
    sections.push(generateSection('📊 Executive Overview', data.agenda, COLORS.overview));
  }

  // Core Insights & Teachings section
  if (data.insights && data.insights.length > 0) {
    sections.push(generateSection('💡 Core Insights & Teachings', data.insights, COLORS.insights));
  } else if (data.decisions && data.decisions.length > 0) {
    sections.push(generateSection('💡 Core Insights & Teachings', data.decisions, COLORS.insights));
  }

  // Media & Reference Library section
  if (data.media && data.media.length > 0) {
    sections.push(generateSection('📚 Media & Reference Library', data.media, COLORS.media));
  } else if (data.actions && data.actions.length > 0) {
    sections.push(generateSection('📚 Media & Reference Library', data.actions, COLORS.media));
  }

  // Digital Toolkit section
  if (data.toolkit && data.toolkit.length > 0) {
    sections.push(generateSection('🧰 Digital Toolkit', data.toolkit, COLORS.toolkit));
  } else if (data.highlights && data.highlights.length > 0) {
    sections.push(generateSection('🧰 Digital Toolkit', data.highlights, COLORS.toolkit));
  }

  return `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${escapeHtml(data.meeting_title)} - Executive Recap</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #e2e8f0; font-family: Arial, sans-serif; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">

  <!-- Wrapper Table -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #e2e8f0;">
    <tr>
      <td align="center" style="padding: 40px 20px;">

        <!-- Main Container Table -->
        <table border="0" cellpadding="0" cellspacing="0" width="900" style="max-width: 900px; background-color: #ffffff; border-radius: 16px;">

          <!-- Header Section -->
          <tr>
            <td style="background-color: ${BRAND.accentColor}; padding: 50px 40px; text-align: center; border-radius: 16px 16px 0 0;">
              <!--[if mso]>
              <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:900px;">
              <v:fill type="gradient" color="${BRAND.primaryColor}" color2="${BRAND.lightAccent}" angle="135" />
              <v:textbox inset="0,0,0,0">
              <![endif]-->
              <div>
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" style="padding-bottom: 30px;">
                      <img src="${BRAND.logoUrl}" alt="${BRAND.name}" width="280" style="display: block; border: 0; max-width: 280px; height: auto;" />
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="color: #ffffff; font-size: 36px; font-weight: bold; line-height: 1.2; padding: 0;">
                      ${escapeHtml(data.meeting_title)}
                    </td>
                  </tr>
                </table>
              </div>
              <!--[if mso]>
              </v:textbox>
              </v:rect>
              <![endif]-->
            </td>
          </tr>

          <!-- Content Section -->
          <tr>
            <td style="padding: 50px 40px;">

              <!-- Meeting Info Box -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-radius: 12px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
                <tr>
                  <td style="padding: 24px 28px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="50%" style="padding: 8px;">
                          <div style="margin: 0; font-size: 15px; line-height: 1.6; color: #475569;">
                            <strong style="color: ${BRAND.primaryColor}; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">DATE</strong>
                            <span style="color: #1e293b; font-size: 15px; font-weight: 500;">${escapeHtml(data.meeting_date)}</span>
                          </div>
                        </td>
                        <td width="50%" style="padding: 8px;">
                          <div style="margin: 0; font-size: 15px; line-height: 1.6; color: #475569;">
                            <strong style="color: ${BRAND.primaryColor}; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 6px;">GUEST SPEAKER</strong>
                            <span style="color: #1e293b; font-size: 15px; font-weight: 500;">${escapeHtml(data.guest_speaker || data.attendees)}</span>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Feature Image -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 40px;">
                <tr>
                  <td align="center" style="border-radius: 12px; overflow: hidden;">
                    <img src="${BRAND.featureImageUrl}" alt="2026 Real Estate Market Update" width="820" style="display: block; width: 100%; max-width: 820px; height: auto; border: 0; border-radius: 12px;" />
                  </td>
                </tr>
              </table>

              <!-- Content Sections -->
              ${sections.join('\n\n')}

            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="background-color: #f8fafc; padding: 32px 40px; text-align: center; color: #64748b; font-size: 13px; border-top: 1px solid #e2e8f0; border-radius: 0 0 16px 16px;">
              <p style="margin: 6px 0; font-weight: 600; color: ${BRAND.accentColor};">${BRAND.name}</p>
              <p style="margin: 6px 0;">Executive Meeting Notes &middot; ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

/**
 * Generate a section with items (Outlook-compatible table layout)
 */
function generateSection(title, items, color) {
  const emojiMatch = title.match(/^([\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}])\s*/u);
  const emoji = emojiMatch ? emojiMatch[0].trim() : '';
  const titleText = emoji ? title.substring(emojiMatch[0].length) : title;

  const itemsHtml = items
    .map(item => `
              <tr>
                <td style="padding: 18px 22px; margin-bottom: 12px; background-color: #f8fafc; border-left: 4px solid ${color}; border-radius: 10px; font-size: 15px; color: #334155; line-height: 1.7;">
                  ${linkifyUrls(escapeHtml(item))}
                </td>
              </tr>
              <tr><td style="height: 12px;"></td></tr>`)
    .join('');

  return `              <!-- Section: ${titleText} -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 45px;">
                <tr>
                  <td style="font-size: 24px; font-weight: 700; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 3px solid ${color}; color: #1e293b;">
                    ${emoji ? `<span style="font-size: 28px; margin-right: 10px;">${emoji}</span>` : ''}
                    <span style="color: ${color};">${titleText}</span>
                  </td>
                </tr>
                <tr><td style="height: 20px;"></td></tr>
                <tr>
                  <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      ${itemsHtml}
                    </table>
                  </td>
                </tr>
              </table>`;
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

/**
 * Convert URLs to clickable links
 */
function linkifyUrls(text) {
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlPattern, '<a href="$1" style="color: #2563eb; text-decoration: underline;">$1</a>');
}

/**
 * Generate subject line
 */
function generateSubject(data) {
  return `Meeting Notes: ${data.meeting_title} - ${data.meeting_date}`;
}

/**
 * Read JSON file
 */
function readJSONFile(filepath) {
  try {
    const content = fs.readFileSync(filepath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading JSON file: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Interactive prompt for meeting data
 */
async function promptForData() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise(resolve => rl.question(query, resolve));

  console.log('\n=== REALTY EXPERTS Outlook Email Generator ===\n');

  const data = {
    meeting_title: await question('Meeting Title: '),
    meeting_date: await question('Meeting Date (e.g., 1/13/26): '),
    guest_speaker: await question('Guest Speaker: '),
    overview: [],
    insights: [],
    media: [],
    toolkit: []
  };

  console.log('\nEnter executive overview items (one per line, empty line to finish):');
  data.overview = await getMultilineInput(rl);

  console.log('\nEnter core insights & teachings (one per line, empty line to finish):');
  data.insights = await getMultilineInput(rl);

  console.log('\nEnter media & reference library items (one per line, empty line to finish):');
  data.media = await getMultilineInput(rl);

  console.log('\nEnter digital toolkit items (one per line, empty line to finish):');
  data.toolkit = await getMultilineInput(rl);

  rl.close();
  return data;
}

/**
 * Get multiline input
 */
async function getMultilineInput(rl) {
  const items = [];
  const question = (query) => new Promise(resolve => rl.question(query, resolve));

  while (true) {
    const line = await question('> ');
    if (!line.trim()) break;
    items.push(line.trim());
  }

  return items;
}

/**
 * Save HTML to file
 */
function saveHTML(html, filename) {
  fs.writeFileSync(filename, html, 'utf8');
}

/**
 * Print summary
 */
function printSummary(data, outputFile, subject) {
  console.log('\n' + '='.repeat(60));
  console.log('✅ Outlook Email Generated Successfully!');
  console.log('='.repeat(60));
  console.log(`\n📧 Subject: ${subject}`);
  console.log(`\n📄 Output File: ${outputFile}`);
  console.log('\n📊 Summary:');
  console.log(`   - Executive Overview: ${(data.overview || data.agenda)?.length || 0}`);
  console.log(`   - Core Insights & Teachings: ${(data.insights || data.decisions)?.length || 0}`);
  console.log(`   - Media & Reference Library: ${(data.media || data.actions)?.length || 0}`);
  console.log(`   - Digital Toolkit: ${(data.toolkit || data.highlights)?.length || 0}`);
  console.log('\n💡 Next Steps:');
  console.log('   1. Open the HTML file in a web browser to preview');
  console.log('   2. Open Outlook and create a new email');
  console.log('   3. Copy the entire HTML and paste into the email body');
  console.log('   4. Or: File > Save As > Outlook Template (.oft)');
  console.log('\n' + '='.repeat(60) + '\n');
}

/**
 * Display usage information
 */
function displayUsage() {
  console.log(`
Usage: node generate-outlook-email.js [options]

Options:
  --json <file>        Load meeting data from JSON file
  --output <file>      Output filename (default: outlook-meeting-notes-TIMESTAMP.html)
  --help              Display this help message

Input Methods:
  1. JSON file:        node generate-outlook-email.js --json example-meeting.json
  2. Interactive:      node generate-outlook-email.js (no arguments)

JSON File Format:
  {
    "meeting_title": "Executive Recap & Resources",
    "meeting_date": "1/13/26",
    "guest_speaker": "Bill Harrison, Claudia Muller",
    "overview": ["Item 1", "Item 2"],
    "insights": ["Insight 1", "Insight 2"],
    "media": ["📹 Recording link", "📊 Slides"],
    "toolkit": ["🔗 Resource 1", "📱 Tool 2"]
  }

Examples:
  node generate-outlook-email.js --json example-meeting.json
  node generate-outlook-email.js --json data.json --output team-sync.html
  node generate-outlook-email.js
`);
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  // Check for help flag
  if (args.includes('--help') || args.includes('-h')) {
    displayUsage();
    process.exit(0);
  }

  let meetingData;
  let outputFile;

  // Parse arguments
  const jsonIndex = args.indexOf('--json');
  const outputIndex = args.indexOf('--output');

  if (jsonIndex !== -1 && args[jsonIndex + 1]) {
    // Load from JSON file
    const jsonFile = args[jsonIndex + 1];
    meetingData = readJSONFile(jsonFile);
  } else {
    // Interactive mode
    meetingData = await promptForData();
  }

  // Validate required fields
  if (!meetingData.meeting_title || !meetingData.meeting_date || (!meetingData.guest_speaker && !meetingData.attendees)) {
    console.error('Error: meeting_title, meeting_date, and guest_speaker are required fields.');
    process.exit(1);
  }

  // Determine output filename
  if (outputIndex !== -1 && args[outputIndex + 1]) {
    outputFile = args[outputIndex + 1];
  } else {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const sanitized = meetingData.meeting_title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .substring(0, 30);
    outputFile = `outlook-meeting-notes-${sanitized}-${timestamp}.html`;
  }

  // Generate HTML and subject
  const html = generateOutlookHTML(meetingData);
  const subject = generateSubject(meetingData);

  // Save file
  saveHTML(html, outputFile);

  // Print summary
  printSummary(meetingData, outputFile, subject);
}

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
}

module.exports = { generateOutlookHTML, generateSubject };
