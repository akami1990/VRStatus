# VRStatus 🥽

A [Revenge](https://github.com/revenge-mod/revenge) plugin that adds a **fake VR headset activity** to your Discord profile — just like having a real Meta Quest or Valve Index connected.

---

## Preview

> **Playing** `<? wtf '!` · 🎮 `2:18`  
> *Wearing headset 🥽*

---

## Install

### Method 1 — Direct URL (recommended)

1. Open **Discord** with Revenge installed
2. Go to **Settings → Plugins → Install Plugin**
3. Paste this URL:

```
https://raw.githubusercontent.com/YourName/VRStatus/main/index.js
```

4. Tap **Install** ✅
5. Enable the plugin → VR status appears instantly 🥽

---

### Method 2 — Manual

1. Download `index.js` and `manifest.json`
2. Place both files inside a folder named `VRStatus`
3. Copy the folder to your Revenge plugins directory
4. Enable in **Settings → Plugins**

---

## How it works

The plugin dispatches a `LOCAL_ACTIVITY_UPDATE` event to Discord's internal Flux store, simulating a SteamVR session. Discord treats it as a real VR activity and displays the 🥽 badge on your profile.

It also re-injects the activity every **5 minutes** so Discord doesn't drop it.

---

## Requirements

- [Revenge](https://github.com/revenge-mod/revenge) installed on your device
- Discord mobile (Android / iOS)

---

## License

MIT
