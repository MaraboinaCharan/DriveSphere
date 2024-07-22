"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var categorybyname_component_1 = require("./categorybyname.component");
describe('CategorybynameComponent', function () {
    var component;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [categorybyname_component_1.CategoryByNameComponent]
        });
        fixture = testing_1.TestBed.createComponent(categorybyname_component_1.CategoryByNameComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
