import Nodealert from "alert";
interface EventEmitter {
  subscribe(
    event: string,
    callback: (...args: any[]) => void
  ): { unsubscribe: () => void };
  emit(event: string, ...args: any[]): void;
}

class CustomEventEmitter implements EventEmitter {
  private events = new Map<string, Array<(...args: any[]) => void>>();
  subscribe(
    event: string,
    callback: (...args: any[]) => void
  ): { unsubscribe: () => void } {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);

    return {
      unsubscribe: () => {
        const callbacks = this.events.get(event);
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      },
    };
  }

  emit(event: string, ...args: any[]): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => callback(...args));
    }
  }
}

const EventEmitter = new CustomEventEmitter();

function logKeydown(event: { key: string }) {
  console.log("keyboard pressed: ", event.key);
}
function alertKeydown(event: { key: string }) {
  Nodealert("keyboard pressed: " + event.key);
}
const logKeydownSubscription = EventEmitter.subscribe("keydown", logKeydown);
const alertKeydownSubscription = EventEmitter.subscribe(
  "keydown",
  alertKeydown
);
//test
EventEmitter.emit("keydown", { key: "Enter" });
EventEmitter.emit("keydown", { key: "Right" });
alertKeydownSubscription.unsubscribe();
EventEmitter.emit("keydown", { key: "Left" });
logKeydownSubscription.unsubscribe();
EventEmitter.emit("keydown", { key: "Up" });
