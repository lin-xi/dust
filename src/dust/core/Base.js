module(function(){
	'use strict';

	var util = require('./util');
	var deriveMixin = require('./mixin/derive');
    var notifierMixin = require('./mixin/notifier');

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