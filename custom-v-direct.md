## When to create a custom helper vs. using "native" API's directly?

The decision is solely up to you in all cases. The "native" object is quick access to your native platform so it's suitable and conveneient for a lot of quick native setters and/or getters.

For more complex behavior, creating a custom helper may be cleaner. However everything you can do in a helper, you could also do directly via the "native" object. There's a lot of flexibility here.

The one technical guidance we would give is that each call from the "native" object is a communication point between your native platform and Capacitor. Thus to keep the communication to a minimum, creating a native helper utility can reduce potentially multiple calls to just one method communication.

