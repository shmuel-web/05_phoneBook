"use strict";

var BL = BL || {};

BL.Group = (function () {
    //Class Group
    function Group(name, currentGroup, id) {

        this.name = name;
        this.parent = currentGroup;
        this.id = id;
        this.childItems = [];
    }

    Group.prototype.addSubGroup = function (name, callback) {
        var newSubGroup = new BL.Group(name, this, BL.helpers.generateId());
        this.childItems.push(newSubGroup);
        if (callback) {
            //activate an optional callback function
            callback();
        }
    };

    Group.prototype.addContact = function (firstName, lastName, phoneNumbers, callback) {
        var newContact = new BL.Contact(firstName, lastName, phoneNumbers, this, BL.helpers.generateId());
        this.childItems.push(newContact);
        if (callback) {
            //activate an optional callback function
            callback();
        }
    };

    Group.prototype.changeName = function (newName) {
        this.name = newName;
    };

    Group.prototype.changeChildItemName = function (newName, index) {
        this.childItems[index].changeName(newName);
    };

    return Group;
})();