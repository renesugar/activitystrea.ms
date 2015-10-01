'use strict';

const as = require('linkeddata-vocabs').as;
const utils = require('../utils');
const AsObject = require('./_object');
const moment = require('moment');

class Content extends AsObject {
  constructor(expanded, builder) {
    super(expanded, builder || Content.Builder);
  }

  get height() {
    var ret = Math.max(0, this.get(as.height));
    return isNaN(ret) ? 0 : ret;
  }

  get width() {
    var ret = Math.max(0, this.get(as.width));
    return isNaN(ret) ? 0 : ret;
  }

  get duration() {
    var ret = this.get(as.duration);
    if (typeof ret === 'undefined') return;
    return moment.duration(isNaN(ret)?ret:(ret*1000));
  }

}

class ContentBuilder extends AsObject.Builder {
  constructor(types, base) {
    types = (types || []).concat([as.Content]);
    super(types, base || new Content({}));
  }

  height(val) {
    utils.set_non_negative_int.call(this, as.height, val);
    return this;
  }

  width(val) {
    utils.set_non_negative_int.call(this, as.width, val);
    return this;
  }

  duration(val) {
    utils.set_duration_val.call(this, as.duration, val);
    return this;
  }
}
Content.Builder = ContentBuilder;

module.exports = Content;
