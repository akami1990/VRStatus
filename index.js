import { findByProps } from "@vendetta/metro";
import { showToast } from "@vendetta/ui/toasts";

let interval = null;

function injectVR() {
    try {
        const Dispatcher = findByProps("dispatch", "subscribe");
        if (!Dispatcher) return;
        Dispatcher.dispatch({
            type: "LOCAL_ACTIVITY_UPDATE",
            activity: {
                name: "<? wtf '!",
                type: 0,
                application_id: "438122941302046720",
                details: "In VR",
                state: "Wearing headset 🥽",
                timestamps: { start: Math.floor(Date.now() / 1000) },
                platform: "embedded",
                flags: 1
            },
            socketId: "VRStatus"
        });
    } catch (e) {
        console.error("[VRStatus]", e);
    }
}

function removeVR() {
    try {
        const Dispatcher = findByProps("dispatch", "subscribe");
        if (!Dispatcher) return;
        Dispatcher.dispatch({
            type: "LOCAL_ACTIVITY_UPDATE",
            activity: null,
            socketId: "VRStatus"
        });
    } catch (e) {}
}

export default {
    onLoad() {
        injectVR();
        interval = setInterval(injectVR, 5 * 60 * 1000);
        showToast("VRStatus ON 🥽", findByProps("CHECKMARK_CIRCLE_24")?.CHECKMARK_CIRCLE_24);
    },
    onUnload() {
        clearInterval(interval);
        removeVR();
    }
};
