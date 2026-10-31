import { findByProps } from "@metro/utils";
import { before, after } from "@patcher";
import { showToast } from "@ui/toasts";
import { storage } from "@vendetta/plugin";

// ── Default settings ──────────────────────────────────────────────
storage.appName   ??= "<? wtf '!";
storage.statusText ??= "In VR";
storage.enabled   ??= true;

let _interval = null;

// ── VR Activity payload ───────────────────────────────────────────
function buildActivity() {
    return {
        name: storage.appName,
        type: 0,                               // 0 = Playing
        application_id: "438122941302046720",  // SteamVR app id
        details: storage.statusText,
        state: "Wearing headset 🥽",
        timestamps: { start: Math.floor(Date.now() / 1000) },
        assets: {
            large_image: "vr_headset",
            large_text: "In VR",
        },
        platform: "embedded",                  // triggers VR badge
        flags: 1,
    };
}

// ── Inject / Remove ───────────────────────────────────────────────
function injectVR() {
    try {
        const Dispatcher = findByProps("dispatch", "subscribe");
        Dispatcher.dispatch({
            type: "LOCAL_ACTIVITY_UPDATE",
            activity: buildActivity(),
            socketId: "VRStatus",
        });
    } catch (e) {
        console.error("[VRStatus] inject failed:", e);
    }
}

function removeVR() {
    try {
        const Dispatcher = findByProps("dispatch", "subscribe");
        Dispatcher.dispatch({
            type: "LOCAL_ACTIVITY_UPDATE",
            activity: null,
            socketId: "VRStatus",
        });
    } catch (e) {
        console.error("[VRStatus] remove failed:", e);
    }
}

// ── Plugin entry ──────────────────────────────────────────────────
export default {
    onLoad() {
        injectVR();
        // Re-inject every 5 min so Discord doesn't drop it
        _interval = setInterval(injectVR, 5 * 60 * 1000);
        showToast("VRStatus enabled 🥽");
    },

    onUnload() {
        clearInterval(_interval);
        removeVR();
        showToast("VRStatus disabled");
    },
};
