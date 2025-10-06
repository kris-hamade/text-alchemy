/**
 * Email template utilities
 */

export interface EmailTemplateOptions {
  subject?: string;
  recipient?: string;
  sender?: string;
  template?: "simple" | "pretty" | "professional" | "casual";
  format?: "html" | "text";
}

export interface EmailContent {
  greeting?: string;
  body: string;
  closing?: string;
  signature?: string;
}

/**
 * Creates an email template with beautiful styling
 * @param content - The email content
 * @param options - Template options
 * @returns Complete email HTML string
 */
export function createEmailTemplate(content: EmailContent, options: EmailTemplateOptions = {}): string {
  const {
    subject = "Email from Text Alchemy",
    recipient = "Recipient",
    sender = "Sender",
    template = "pretty",
    format = "html",
  } = options;

  if (format === "text") {
    return createTextEmail(content, options);
  }

  const templateStyles = getTemplateStyles(template);

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    <style>
        ${templateStyles}
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1 class="email-subject">${subject}</h1>
            <div class="email-meta">
                <p><strong>To:</strong> ${recipient}</p>
                <p><strong>From:</strong> ${sender}</p>
            </div>
        </div>
        
        <div class="email-body">
            ${content.greeting ? `<p class="greeting">${content.greeting}</p>` : ""}
            <div class="content">
                ${content.body}
            </div>
            ${content.closing ? `<p class="closing">${content.closing}</p>` : ""}
            ${content.signature ? `<p class="signature">${content.signature}</p>` : ""}
        </div>
        
        <div class="email-footer">
            <p class="footer-text">Generated with Text Alchemy</p>
        </div>
    </div>
</body>
</html>`;
}

/**
 * Creates a plain text email
 */
function createTextEmail(content: EmailContent, options: EmailTemplateOptions): string {
  const { subject = "Email from Text Alchemy", recipient = "Recipient", sender = "Sender" } = options;

  return `Subject: ${subject}
To: ${recipient}
From: ${sender}

${content.greeting || ""}

${content.body}

${content.closing || ""}

${content.signature || ""}

---
Generated with Text Alchemy`;
}

/**
 * Gets CSS styles for different email templates
 */
function getTemplateStyles(template: string): string {
  const baseStyles = `
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 20px;
      background-color: #f8f9fa;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    .email-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
    }
    
    .email-subject {
      margin: 0 0 15px 0;
      font-size: 24px;
      font-weight: 300;
    }
    
    .email-meta {
      font-size: 14px;
      opacity: 0.9;
    }
    
    .email-meta p {
      margin: 5px 0;
    }
    
    .email-body {
      padding: 30px;
    }
    
    .greeting {
      font-size: 16px;
      margin-bottom: 20px;
      color: #2c3e50;
    }
    
    .content {
      font-size: 15px;
      line-height: 1.7;
      color: #34495e;
      margin-bottom: 20px;
    }
    
    .closing {
      font-size: 15px;
      margin: 20px 0 10px 0;
      color: #2c3e50;
    }
    
    .signature {
      font-size: 14px;
      color: #7f8c8d;
      font-style: italic;
    }
    
    .email-footer {
      background: #f8f9fa;
      padding: 15px 30px;
      text-align: center;
      border-top: 1px solid #e9ecef;
    }
    
    .footer-text {
      margin: 0;
      font-size: 12px;
      color: #6c757d;
    }
  `;

  const templateVariations = {
    simple: `
      .email-header {
        background: #007bff;
      }
    `,
    pretty: `
      .email-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
    `,
    professional: `
      .email-header {
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
      }
      .email-container {
        border: 1px solid #dee2e6;
      }
    `,
    casual: `
      .email-header {
        background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
      }
      .email-container {
        border-radius: 12px;
      }
    `,
  };

  return baseStyles + (templateVariations[template as keyof typeof templateVariations] || templateVariations.pretty);
}

/**
 * Creates a formatted email content with text formatting options
 */
export function createFormattedEmailContent(
  text: string,
  formattingOptions: {
    greeting?: string;
    closing?: string;
    signature?: string;
    bold?: boolean;
    italic?: boolean;
    color?: string;
  } = {}
): EmailContent {
  let formattedBody = text;

  // Apply formatting
  if (formattingOptions.bold) {
    formattedBody = `<strong>${formattedBody}</strong>`;
  }

  if (formattingOptions.italic) {
    formattedBody = `<em>${formattedBody}</em>`;
  }

  if (formattingOptions.color) {
    formattedBody = `<span style="color: ${formattingOptions.color};">${formattedBody}</span>`;
  }

  return {
    greeting: formattingOptions.greeting,
    body: formattedBody,
    closing: formattingOptions.closing,
    signature: formattingOptions.signature,
  };
}
