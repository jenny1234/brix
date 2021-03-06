KISSY.add('brix/gallery/calendar/time', function(S, Brick) {
    var LIST = {
        h: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        m: ['00', '10', '20', '30', '40', '50'],
        s: ['00', '10', '20', '30', '40', '50']
    }
    var tmpl = '@TEMPLATE|' + Brix.absoluteFilePath(this, 'time.html') + '|TEMPLATE@';
    var Time = Brick.extend({
        _setTime: function(status, v) {
            var self = this,
                time = self.get('time'),
                el = self.get('el');
            v = Number(v);
            switch (status) {
                case 'h':
                    time.setHours(v);
                    break;
                case 'm':
                    time.setMinutes(v);
                    break;
                case 's':
                    time.setSeconds(v);
                    break;
            }
            self.setChunkData('h', time.getHours());
            self.setChunkData('m', time.getMinutes());
            self.setChunkData('s', time.getSeconds());
        },
        _getTime: function(status) {
            var self = this,
                time = self.get('time');
            switch (status) {
                case 'h':
                    return time.getHours();
                case 'm':
                    return time.getMinutes();
                case 's':
                    return time.getSeconds();
            }
        },
        _hideTimePopup: function() {
            var self = this,
                el = self.get('el');
            el.one('.calendar-time-popup').css({
                display: 'none'
            });
        }
    }, {
        ATTRS: {
            time: {
                value: new Date()
            },
            status: {
                value: 's'
            },
            autoRender: {
                value: true
            },
            tmpl: {
                value: tmpl
            },
            data: {
                valueFn: function() {
                    var self = this,
                        date = self.get('time');
                    return {
                        h: date.getHours(),
                        m: date.getMinutes(),
                        s: date.getSeconds()
                    };
                }
            }
        },
        EVENTS: {
            'span': {
                click: function(e) {
                    var self = this,
                        node = S.one(e.currentTarget);
                    node.parent().all('span').removeClass('on');
                    node.addClass('on');
                    if (node.hasClass('h')) {
                        self.set('status', 'h');
                    } else if (node.hasClass('m')) {
                        self.set('status', 'm');
                    } else {
                        self.set('status', 's');
                    }
                    var status = self.get('status');
                    self.setChunkData('list', LIST[status]);
                    self.get('el').one('.calendar-time-popup').css({
                        display: 'block'
                    });
                }
            },
            '.icon-close': {
                click: function(e) {
                    var self = this;
                    self._hideTimePopup();
                }
            },
            '.item': {
                click: function(e) {
                    var self = this,
                        node = S.one(e.currentTarget),
                        status = self.get('status');
                    self._setTime(status, node.html());
                    self._hideTimePopup();
                }
            },
            '.u': {
                click: function(e) {
                    var self = this,
                        status = self.get('status'),
                        v = self._getTime(status);
                    v++;
                    self._setTime(status, v);
                }
            },
            '.d': {
                click: function(e) {
                    var self = this,
                        status = self.get('status'),
                        v = self._getTime(status);
                    v--;
                    self._setTime(status, v);
                }
            },
            '': {
                keyup: function(e) {
                    var self = this,
                        status = self.get('status'),
                        v = self._getTime(status);
                    if (e.keyCode == 38 || e.keyCode == 37) { //up or left
                        e.preventDefault();
                        v++;
                        self._setTime(status, v);
                    }
                    if (e.keyCode == 40 || e.keyCode == 39) { //down or right
                        //e.stopPropagation();
                        e.preventDefault();
                        v--;
                        self._setTime(status, v);
                    }
                }
            }
        },
        FIRES: {
            timeSelect: 'timeSelect'
        }
    }, 'Time');
    return Time;
}, {
    requires: ["brix/core/brick"]
});