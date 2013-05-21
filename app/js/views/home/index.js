define(function(require, exports, module) {
    var Backbone = require('backbone'),
        Handlebars = require('handlebars'),
        Bootstrap = require('bootstrap');

    Application.Views.Home = Backbone.View.extend({
        template: Handlebars.templates['index'],

        events:{
            'click .dropdown-menu li':'changeSelectValue',
            'click .iconGroup li a': 'setActiveTopNav',
            'click .tabNavItem' : 'setActiveTabNav',
            'click .deptNavButton' : 'showDeptNav',
            'click .navAccountIcon' : 'showAccountNav',
            'click .navCartIcon' : 'showCartNav',
        },
        initialize:function () {
            console.log('main view initialized');
        },
        render:function () {
            var context = this.model ? this.model.attributes : {};
            $(this.el).html(this.template);


            // Bootstrap TypeAhead
            this.$('#textWalmartSearch').typeahead({
                source: function(){
                    //Data Source, can use Array of Strings or Array of Objects
                    var colors = ["red", "blue", "green", "yellow", "brown", "black", "sony", "mitsubishi", "samsung", "aeiuqwsdfomgl00oorbryoooonoong"];
                    return colors;
                },
                // You can override the matched text to just the beginning of the strings or your own pattern
                /*
                matcher: function (item) {
                    if (item.toLowerCase().indexOf(this.query.trim().toLowerCase()) != -1) {
                        return true;
                    }
                },
                */
                highlighter: function (item) {
                    var regex = new RegExp( '(' + this.query + ')', 'gi' );
                    return item.replace( regex, "<strong class=\'searchTextMatch\'>$1</strong>" );
                }
            });

            this.$('.deptNav').collapse({
                toggle: false
            });

            this.$('.accountNav').collapse({
                toggle: false
            });

            this.$('.cartNav').collapse({
                toggle: false
            });

            return this;
        },
        changeSelectValue:function(e){
            var ele = this.$(e.currentTarget);
            var addCaret = $('<span></span>').addClass('caret');
            $('#navCategory').text(ele.text()).append('&nbsp;').append(addCaret);

        },
        setActiveTopNav:function(e){
            var ele = this.$(e.currentTarget);

            /*
            var eleClass =  ele.attr('class');
            if (eleClass == "navAccountIcon"){
                console.log(eleClass);
                this.$('.accountNav').toggle(400);
            }
            */

            //if you are navigating to another page and want to control the highlight
                var parentContainer = ele.closest('li');
                parentContainer.siblings().removeClass('active');
                parentContainer.toggleClass('active');
        },
        setActiveTabNav:function(e){
            var ele = this.$(e.currentTarget);
            ele.siblings().removeClass('active');
            ele.addClass('active');
        },
        showDeptNav: function(){
            this.$('.deptNav').collapse('toggle')
            this.$('.accountNav').collapse('hide');
            this.$('.cartNav').collapse('hide');
            this.$('.iconGroup li').removeClass('active');
        },
        showAccountNav: function(){
            this.$('.deptNav').collapse('hide')
            this.$('.accountNav').collapse('toggle');
            this.$('.cartNav').collapse('hide');
        },
        showCartNav: function(){
            this.$('.deptNav').collapse('hide')
            this.$('.accountNav').collapse('hide');
            this.$('.cartNav').collapse('toggle');
        }

    });

    return Application.Views.Home;

  }
);
