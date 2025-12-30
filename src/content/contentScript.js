let styleTag = null;

const applyTheme = (settings) => {
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'theme-customizer-overrides';
    (document.head || document.documentElement).appendChild(styleTag);
  }

  if (!settings || !settings.enabled) {
    styleTag.textContent = '';
    return;
  }

  styleTag.textContent = `
    :root {
      --custom-bg: ${settings.bgColor} !important;
      --custom-text: ${settings.textColor} !important;
      --custom-link: ${settings.linkColor} !important;
    }

    html, body, #root, .app, .container, .main, .content {
      background-color: var(--custom-bg) !important;
      color: var(--custom-text) !important;
    }

    p, span, h1, h2, h3, h4, h5, h6, li, div {
      color: var(--custom-text) !important;
    }

    a {
      color: var(--custom-link) !important;
    }

    * {
      border-color: rgba(255,255,255,0.1) !important;
    }
  `;
};

const domain = window.location.hostname;
chrome.storage.local.get([domain], (result) => {
  if (result[domain]) {
    applyTheme(result[domain]);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'UPDATE_THEME') {
    applyTheme(message.settings);
    sendResponse({ status: "success" });
  }
  return true; 
});