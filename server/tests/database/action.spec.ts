
import { expect } from 'chai';
// import { assert } from 'assert';
var assert = require('assert');

let hello = () => {return 'Hello world!'};

import 'mocha';

import { Repository } from '../../src/repository/repository';
import { Action } from '../../src/middleware/action';
import {ActionRepository} from '../../src/repository/action.repository';


describe('Action Repository Testing', () => {

  before(function() {
    new Repository();

  });

  it('should return hello world', () => {

    const result = hello();
    expect(result).to.equal('Hello world!');
  });


  describe('Action upset testing', () => {
    it('should save action data to database', async () => {
      let db = new ActionRepository();

      let a = await db.readAll(1);
      console.log(a[0].toJSON())

      expect(1).to.equal(1);
    });
  });
});
