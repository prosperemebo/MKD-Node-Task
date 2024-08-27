'use strict';

/*Powered By: Manaknightdigital Inc. https://manaknightdigital.com/ Year: 2021*/
/**
 * Termination Configuration View Model
 *
 * @copyright 2021 Manaknightdigital Inc.
 * @link https://manaknightdigital.com
 * @license Proprietary Software licensing
 * @author Ryan Wong
 */

const db = require('../models');
let AuthService = require('../services/AuthService');

module.exports = function (
  entity,
  pageName = '',
  success,
  error,
  base_url = '',
  form_fields
) {
  this._entity = entity;
  this.session = null;

  this.success = success || null;
  this.error = error || null;

  this._base_url = base_url;

  this.get_page_name = () => pageName;

  this.endpoint = '/admin/terminate-configuration';

  this.heading = 'Quiz Termination Configuration';

  this.action = '/admin/terminate-configuration';

  this.form_fields = {
    message: form_fields.message,
    counter: form_fields.counter,
  };

  return this;
};
