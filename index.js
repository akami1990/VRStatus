import { findByProps } from "@revenge-mod/modules/metro";
import { after } from "@revenge-mod/patcher";

let interval = null;

function buildActivity() {
    return {
        name: "<? wtf '!",
        type: 0,
        application_id: "438122941302046720",
        details: "In VR",
        state: "Wearing headset 🥽",
        timestamps: {
            start: Math.floor(Date.now() / 1000)
        },
        platform: "embedded",
        flags: 1
    };
}

function injectVR() {
    try {
        const Dispatcher = findByProps("dispatch", "subscribe");
        if (!Dispatcher) return;
        Dispatcher.dispatch({
            type: "LOCAL_ACTIVITY_UPDATE",
            activity: buildActivity(),
            socketId: "VRStatus"
        });
    } catch (e) {
        console.error("[VRStatus] Failed to inject:", e);
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
    } catch (e) {
        console.error("[VRStatus] Failed to remove:", e);
    }
}

export default {
    onLoad() {
        injectVR();
        interval = setInterval(injectVR, 5 * 60 * 1000);
    },
    onUnload() {
        clearInterval(interval);
        removeVR();
    }
};
