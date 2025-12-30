import React, { useState, useEffect, useRef } from 'react';
import './popup.css';

const Popup = () => {
  const [enabled, setEnabled] = useState(false);
  const [bgColor, setBgColor] = useState('#121010');
  const [textColor, setTextColor] = useState('#c25757');
  const [linkColor, setLinkColor] = useState('#24044c');
  const [currentDomain, setCurrentDomain] = useState('');

  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]?.url) return;
      try {
        const url = new URL(tabs[0].url);
        const domain = url.hostname;
        setCurrentDomain(domain);

        chrome.storage.local.get([domain], (result) => {
          if (result[domain]) {
            const s = result[domain];
            setEnabled(s.enabled ?? false);
            setBgColor(s.bgColor ?? '#121212');
            setTextColor(s.textColor ?? '#ffffff');
            setLinkColor(s.linkColor ?? '#bb86fc');
          }
        });
      } catch (e) {
        console.error("Cannot run on this page");
      }
    });
  }, []);

  const handleUpdate = (updates) => {
    const newSettings = { enabled, bgColor, textColor, linkColor, ...updates };

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'UPDATE_THEME',
          settings: newSettings
        }).catch(() => {
          console.log("Content script not yet loaded on this page.");
        });
      }
    });

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      chrome.storage.local.set({ [currentDomain]: newSettings });
    }, 300); 
  };

  return (
    <div className="popup-container">
      <h3>Theme Customizer</h3>
      <div className="tab-info">{currentDomain || 'Restricted Page'}</div>
      
      <div className="control-group">
        <label>Enable Custom Theme</label>
        <input 
          type="checkbox" 
          checked={enabled} 
          onChange={(e) => {
            setEnabled(e.target.checked);
            handleUpdate({ enabled: e.target.checked });
          }} 
        />
      </div>

      <div className="control-group">
        <label>Background</label>
        <input type="color" value={bgColor} onChange={(e) => {
          setBgColor(e.target.value);
          handleUpdate({ bgColor: e.target.value });
        }} />
      </div>

      <div className="control-group">
        <label>Text Color</label>
        <input type="color" value={textColor} onChange={(e) => {
          setTextColor(e.target.value);
          handleUpdate({ textColor: e.target.value });
        }} />
      </div>

      <div className="control-group">
        <label>Link Color</label>
        <input type="color" value={linkColor} onChange={(e) => {
          setLinkColor(e.target.value);
          handleUpdate({ linkColor: e.target.value });
        }} />
      </div>

      <button className="reset-btn" onClick={() => {
        const defaults = { enabled: false, bgColor: '#121212', textColor: '#ffffff', linkColor: '#bb86fc' };
        setEnabled(false); setBgColor('#121212'); setTextColor('#ffffff'); setLinkColor('#bb86fc');
        
        chrome.storage.local.remove(currentDomain, () => {
           handleUpdate(defaults);
        });
      }}>Reset to Default</button>
    </div>
  );
};

export default Popup;