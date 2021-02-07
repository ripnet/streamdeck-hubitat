const DestinationEnum = Object.freeze({ "HARDWARE_AND_SOFTWARE": 0, "HARDWARE_ONLY": 1, "SOFTWARE_ONLY": 2 })

class Emitter {
    constructor() {
        this.subscribers = {};
    }

    subscribe(eventName, callback) {

        if (!this.subscribers.hasOwnProperty(eventName)) {
            this.subscribers[eventName] = [];
        }

        this.subscribers[eventName].push({
            callback: callback
        });

        return this;
    }

    emit(eventName, data) {
        if (!this.subscribers.hasOwnProperty(eventName)) {
            return this;
        }
        this.subscribers[eventName].forEach((subscriber) => {
            subscriber.callback(data);
        });
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class StreamDeck extends Emitter {

    constructor(inPort, inPluginUUID, inRegisterEvent, inInfo, inActionInfo = null) {
        super();

        this.inPort = inPort;
        this.inPluginUUID = inPluginUUID;
        this.inInfo = inInfo;
        this.inRegisterEvent = inRegisterEvent;
        this.clientReady = false;
        this.actionInfo = null;

        if (inActionInfo) {
            this.actionInfo = JSON.parse(inActionInfo);
        }

        this.ws = new WebSocket('ws://127.0.0.1:' + this.inPort)

        this.ws.onopen = () => {
            this.registerPlugin();
        }

        this.ws.onmessage = async (evt) => {
            const data = JSON.parse(evt.data);

            let timer = 0;
            while (this.clientReady === false && timer < 1000) { // wait for all events to be subscribed before sending them
                await sleep(10)
                timer++;
            }

            this.emit(data.event, data);
        }

    }

    sendEvents() {
        this.clientReady = true;
        this.getGlobalSettings();
    }

    registerPlugin() {
        this.sendMessage({'event': this.inRegisterEvent, 'uuid': this.inPluginUUID});
        this.ready = true;
    }

    sendMessage(json) {
        this.ws.send(JSON.stringify(json));
    }

    setImageFile(context, file) {
        let image = new Image();

        image.onload = function() {
            let canvas = document.createElement("canvas");
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(this, 0, 0);
            $sd.setImage(context, canvas.toDataURL("image/png"))
        }

        image.src = '../resources/img/' + file + ".png";

    }

    setImage(context, image) {
        this.sendMessage({
            'event': 'setImage',
            'context': context,
            'payload': {
                image: image,
                target: DestinationEnum.HARDWARE_AND_SOFTWARE,
            }
        });
    }

    getGlobalSettings() {
        this.sendMessage({'event': 'getGlobalSettings', 'context': this.inPluginUUID});
    }

    setGlobalSettings(settings) {
        this.sendMessage({'event': 'setGlobalSettings', 'context': this.inPluginUUID, 'payload': settings});
    }

    getSettings(context = this.inPluginUUID){
        this.sendMessage({'event': 'getSettings', 'context': context});
    }

    setSettings(settings, context = this.inPluginUUID) {
        this.sendMessage({'event': 'setSettings', 'context': context, 'payload': settings});
    }

    ready = false;
}
let $sd = {ready: false};
function connectElgatoStreamDeckSocket(inPort, inPluginUUID, inRegisterEvent, inInfo, inActionInfo = null) {
    $sd = new StreamDeck(inPort, inPluginUUID, inRegisterEvent, inInfo, inActionInfo);
}


