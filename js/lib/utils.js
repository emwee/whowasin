// Generated by CoffeeScript 1.6.2
(function() {
  var Chaplin, utils,
    __hasProp = {}.hasOwnProperty;

  Chaplin = require('chaplin');

  utils = Chaplin.utils.beget(Chaplin.utils);

  _(utils).extend({
    /*
    Wrap methods so they can be called before a deferred is resolved.
    The actual methods are called once the deferred is resolved.
    
    Parameters:
    
    Expects an options hash with the following properties:
    
    deferred
      The Deferred object to wait for.
    
    methods
      Either:
      - A string with a method name e.g. 'method'
      - An array of strings e.g. ['method1', 'method2']
      - An object with methods e.g. {method: -> alert('resolved!')}
    
    host (optional)
      If you pass an array of strings in the `methods` parameter the methods
      are fetched from this object. Defaults to `deferred`.
    
    target (optional)
      The target object the new wrapper methods are created at.
      Defaults to host if host is given, otherwise it defaults to deferred.
    
    onDeferral (optional)
      An additional callback function which is invoked when the method is called
      and the Deferred isn't resolved yet.
      After the method is registered as a done handler on the Deferred,
      this callback is invoked. This can be used to trigger the resolving
      of the Deferred.
    
    Examples:
    
    deferMethods(deferred: def, methods: 'foo')
      Wrap the method named foo of the given deferred def and
      postpone all calls until the deferred is resolved.
    
    deferMethods(deferred: def, methods: def.specialMethods)
      Read all methods from the hash def.specialMethods and
      create wrapped methods with the same names at def.
    
    deferMethods(
      deferred: def, methods: def.specialMethods, target: def.specialMethods
    )
      Read all methods from the object def.specialMethods and
      create wrapped methods at def.specialMethods,
      overwriting the existing ones.
    
    deferMethods(deferred: def, host: obj, methods: ['foo', 'bar'])
      Wrap the methods obj.foo and obj.bar so all calls to them are postponed
      until def is resolved. obj.foo and obj.bar are overwritten
      with their wrappers.
    */

    deferMethods: function(options) {
      var deferred, func, host, methods, methodsHash, name, onDeferral, target, _i, _len, _results;

      deferred = options.deferred;
      methods = options.methods;
      host = options.host || deferred;
      target = options.target || host;
      onDeferral = options.onDeferral;
      methodsHash = {};
      if (typeof methods === 'string') {
        methodsHash[methods] = host[methods];
      } else if (methods.length && methods[0]) {
        for (_i = 0, _len = methods.length; _i < _len; _i++) {
          name = methods[_i];
          func = host[name];
          if (typeof func !== 'function') {
            throw new TypeError("utils.deferMethods: method " + name + " notfound on host " + host);
          }
          methodsHash[name] = func;
        }
      } else {
        methodsHash = methods;
      }
      _results = [];
      for (name in methodsHash) {
        if (!__hasProp.call(methodsHash, name)) continue;
        func = methodsHash[name];
        if (typeof func !== 'function') {
          continue;
        }
        _results.push(target[name] = utils.createDeferredFunction(deferred, func, target, onDeferral));
      }
      return _results;
    },
    createDeferredFunction: function(deferred, func, context, onDeferral) {
      if (context == null) {
        context = deferred;
      }
      return function() {
        var args;

        args = arguments;
        if (deferred.state() === 'resolved') {
          return func.apply(context, args);
        } else {
          deferred.done(function() {
            return func.apply(context, args);
          });
          if (typeof onDeferral === 'function') {
            return onDeferral.apply(context);
          }
        }
      };
    }
  });

  module.exports = utils;

}).call(this);