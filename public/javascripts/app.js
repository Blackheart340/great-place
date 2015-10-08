var Map = function (opts) {

    opts = opts || {};

    this.long = 55.76;
    this.lat = 37.64;
    this.zoom = 7;
    this.elem = 'map';
};

Map.prototype.init = function () {
    var self = this;

    this._map = new ymaps.Map(this.elem, {
        center: [this.long, this.lat],
        zoom: this.zoom
    });

    this._map.events.add('click', function (e) {
        self.addMark(e.get('coordPosition'));
    });

    app.eachListItems();

    return this;
};

Map.prototype.createMark = function (coords) {
    var place =  new ymaps.Placemark(coords, {}, {
        preset: 'islands#blueDotIcon',
        hideIconOnBalloonOpen: true
    });

    this._map.geoObjects.add(place);
};

Map.prototype.addMark = function (coords) {
    this.createMark(coords);
    app.openForm(coords);
};

var mapObj = new Map();

ymaps.ready(mapObj.init.bind(mapObj));


var app = {
    init: function(){
        this.collectData();
        this.bindEvents();
    },

    collectData: function(){
        this.api = '/api/v1/dot/add';

        this.form = $('.form');
        this.btn = this.form.find('.send');
        this.inputs = this.form.find('input');
        this.long = this.form.find('.long');
        this.lat = this.form.find('.lat');

        this.items = $('.list .item');
    },

    bindEvents: function(){
        this.btn.on('click', this.sendForm.bind(this));
    },

    openForm: function(coords){
        this.long.val(coords[0]);
        this.lat.val(coords[1]);

        this.form.show();
    },

    grabForm: function(){
        var res = {};

        this.inputs.each(function(n, input){
            var name = $(input).attr('name');
            var val = $(input).val();

            if(name) res[name] = val;
        });

        return res;
    },

    sendForm: function(){
        var data = this.grabForm();

        $.ajax({
            url: this.api,
            data: data,
            success: this.onSuccess,
            error: this.onError
        });
    },

    onSuccess: function(){

    },

    onError: function(){

    },

    eachListItems: function(){
        this.items.each(function(n, item){
            var long = $(item).attr('data-long');
            var lat = $(item).attr('data-lat');

            mapObj.createMark([ long, lat ]);
        });
    }
};

app.init();