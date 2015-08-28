module("/build/dust/core/Base.js", function(){
	'use strict';

	var util = require("/build/dust/core/util.js");
	var deriveMixin = require("/build/dust/core/mixin/derive.js");
    var notifierMixin = require("/build/dust/core/mixin/notifier.js");

	function Base() {
        /**
         * @type {number}
         */
        this.__GUID__ = util.genGUID();
    };

    Base.__initializers__ = [
        function(opts) {
            util.extend(this, opts);
        }
    ];

    util.extend(Base, deriveMixin);
    util.extend(Base.prototype, notifierMixin);

    return Base;
});