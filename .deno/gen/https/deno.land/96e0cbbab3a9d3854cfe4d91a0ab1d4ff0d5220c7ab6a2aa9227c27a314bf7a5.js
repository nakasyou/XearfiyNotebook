// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
/**
 * A collection of APIs to provide help with asynchronous tasks.
 *
 * @module
 */ export * from "./abortable.ts";
export * from "./deadline.ts";
export * from "./debounce.ts";
export * from "./deferred.ts";
export * from "./delay.ts";
export * from "./mux_async_iterator.ts";
export * from "./pool.ts";
export * from "./tee.ts";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjE0MS4wL2FzeW5jL21vZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIHRoZSBEZW5vIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIE1JVCBsaWNlbnNlLlxuXG4vKipcbiAqIEEgY29sbGVjdGlvbiBvZiBBUElzIHRvIHByb3ZpZGUgaGVscCB3aXRoIGFzeW5jaHJvbm91cyB0YXNrcy5cbiAqXG4gKiBAbW9kdWxlXG4gKi9cblxuZXhwb3J0ICogZnJvbSBcIi4vYWJvcnRhYmxlLnRzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9kZWFkbGluZS50c1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vZGVib3VuY2UudHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL2RlZmVycmVkLnRzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9kZWxheS50c1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vbXV4X2FzeW5jX2l0ZXJhdG9yLnRzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9wb29sLnRzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi90ZWUudHNcIjtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwRUFBMEU7QUFFMUU7Ozs7Q0FJQyxHQUVELGNBQWMsaUJBQWlCO0FBQy9CLGNBQWMsZ0JBQWdCO0FBQzlCLGNBQWMsZ0JBQWdCO0FBQzlCLGNBQWMsZ0JBQWdCO0FBQzlCLGNBQWMsYUFBYTtBQUMzQixjQUFjLDBCQUEwQjtBQUN4QyxjQUFjLFlBQVk7QUFDMUIsY0FBYyxXQUFXIn0=