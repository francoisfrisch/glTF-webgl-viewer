// Copyright (c) 2013, Fabrice Robinet
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  * Redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.
//  * Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
// THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

var Montage = require("montage").Montage;
var Component3D = require("runtime/component-3d").Component3D;

exports.Material = Component3D.specialize( {

    constructor: {
        value: function Material() {
            this.super();
            this.addRangeAtPathChangeListener("filterColor", this, "handleFilterColorChange")
        }
    },

    filterColor: { value: null},

    handleFilterColorChange: {
        value: function(plus, minus, index) {
            if (this.glTFElement != null) {
                if (this.glTFElement.parameters["filterColor"]) {
                    this.glTFElement.parameters["filterColor"].value = this.filterColor;
                }
            }
        }
    },

    _opacity: { value: 1., writable:true },

    opacity: {
        set: function(value) {
            if (this._opacity != value) {
                this._opacity = value;
                if (this.glTFElement != null) {
                    if (this.glTFElement.parameters["transparency"]) {
                        this.glTFElement.parameters["transparency"].value = value;
                    }
                }
            }
        },
        get: function() {
            return this._opacity;
        }
    }

});
