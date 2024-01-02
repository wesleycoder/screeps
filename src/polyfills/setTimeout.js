var actualWindow =
  "undefined" != typeof globalThis
    ? globalThis
    : "undefined" != typeof window
    ? window
    : "undefined" != typeof global
    ? global
    : "undefined" != typeof self
    ? self
    : {};

(function (window) {
  if (window.requestIdleCallback) return;

  window.requestIdleCallback =
    window.requestIdleCallback ||
    function (cb) {
      var start = Date.now();
      return setTimeout(function () {
        cb({
          didTimeout: false,
          timeRemaining: function () {
            return Math.max(0, 50 - (Date.now() - start));
          },
        });
      }, 1);
    };

  window.cancelIdleCallback =
    window.cancelIdleCallback ||
    function (id) {
      clearTimeout(id);
    };
})(actualWindow);

(function (window) {
  if (window.setTimeout) return;

  // List for mainataining callbacks corresponding to their id's
  var timers = {};

  // generates a new id for every mySetTimeout call
  function generateNewId() {
    var r = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    while (timers.hasOwnProperty(r)) {
      // check weather the id already exists
      r = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    }
    return r;
  }

  function check() {
    // return in case there is no timer in the timers list
    if (Object.keys(timers).length <= 0) return;

    var t = Date.now();
    // loop over all the timers
    for (var timerId in timers) {
      if (timers.hasOwnProperty(timerId) && t > timers[timerId].time) {
        // check if the current timer needs to be executed
        timers[timerId].callback();
        myClearTimeout(timerId);
      }
    }
    window.requestIdleCallback(check);
  }

  window.setTimeout = function (callback, delay = 0) {
    if (typeof callback != "function")
      throw new Error("callback should be a function");
    if (typeof delay != "number" || delay < 0)
      throw new Error("delay should be a positive number");

    // generate a new id
    var newId = generateNewId();

    // add it to the list of timers
    timers[newId] = {
      callback: callback,
      time: Date.now() + delay, // add the time after which callback needs to be executed
    };

    // start checking if this is the first timer
    if (Object.keys(timers).length == 1) {
      window.requestIdleCallback(check);
    }

    // return the id to the consumer for referencing it for later use.
    return newId;
  };

  // cancels the callback execution for an id.
  window.clearTimeout = function (id) {
    if (timers.hasOwnProperty(id)) delete timers[id]; // if id exists just delete the timer and in the next check this timer won't be there
  };
})(actualWindow);
