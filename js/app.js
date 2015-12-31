var Pharmacy = Backbone.Model.extend({});
var PharmacyView = Backbone.View.extend({
    initialize: function() {
        var place = this.model.get('place');
        place = new Backbone.GoogleMaps.Location(place);
        this.model.set('place', place);
        this.rendered = false;
    },
    className: 'pharmacy',
    tagName: 'tr',
    template: _.template('<td colspan="6">' +
        '<div class="ph-data"> ' +
        '<div class="ph-name"><%= name %></div>' +
        '<div class="ph-address-wrapper">' +
        '<div class="ph-address-label">Διεύθυνση:</div>' +
        '<div class="ph-address"><%= location %></div>' +
        '</div>' +
        '<div class="ph-tel-wrapper">' +
        '<div class="ph-tel-label">Τηλέφωνο:</div>' +
        '<div class="ph-tel"><%= telephone %></div>' +
        '</div>' +
        '</div>' +
        '<div class="ph-map"></div>' +
        '</td>'),
    render: function() {
        if(!this.mapLoaded) {
            var attrs = this.model.toJSON();
            $(this.el).html(this.template(attrs));
            var mapEl = this.$el.find('.ph-map')[0];
            var place = this.model.get('place');
            var map = new google.maps.Map(mapEl, {
                center: place.getLatLng(),
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var mV = new Backbone.GoogleMaps.MarkerView({
                model: place,
                map: map
            });
            mV.render();
            this.mapLoaded = true;
            setTimeout(_.bind(this.afterVisible, this, mV), 700);
        }
        return this;
    },
    afterVisible: function(mV) {
        google.maps.event.trigger(mV.map, "resize");
        mV.map.setCenter(mV.model.getLatLng());
    }
});
var Efimeria = Backbone.Model.extend({});
var EfimeriaView = Backbone.View.extend({
    tagName: 'tr',
    events: {
        'click': function() {
            var iteration = $(this).data('iteration') || 0;
            var phV = this.model.pharmacyView;
            if(iteration === 0) {
                phV.render().$el.
                        insertAfter(this.$el);
            }
            else {
                phV.$el.remove();
            }
            iteration = (iteration + 1)%2;
            $(this).data('iteration', iteration);
        }
    },
    template: _.template('<td><%= startTime %> - <%= endTime %></td>' +
        '<td><%= date %></td>' +
        '<td><%= pharmacy.name %></td>' +
        '<td><%= pharmacy.location %></td>' +
        '<td><%= pharmacy.telephone %></td>'),
    render: function() {
        var attributes = this.model.toJSON();
        $(this.el).html(this.template(attributes));
        return this;
    }
});
var Efimeries = Backbone.Collection.extend({model: Efimeria});
var efimeries = new Efimeries();

efimeries.reset(efimeriesArray);
//var pharmacies = efimeries.pluck('pharmacy');
//pharmacies = _.uniq(pharmacies,function(p){return p.name;});
//pharmacies = _.object(_.pluck(pharmacies,'name'),pharmacies);
var pharmacies = {"Χατζηδάκη Καλλιόπη":{"name":"Χατζηδάκη Καλλιόπη","location":"Ελ. Βενιζέλου 127, Λιμήν Χερσονήσου,70014 ","telephone":"2897023420","place":{"lat":35.3143256,"lng":25.394850399999996,"title":"Χατζηδάκη Καλλιόπη","selected":false}},"Κοσμάς Μιχαήλ":{"name":"Κοσμάς Μιχαήλ","location":"Ζαχαριάδη Ματθαίου 81, Μάλια, 70007","telephone":"2897033923","place":{"lat":35.2844604,"lng":25.461067500000013,"title":"Κοσμάς Μιχαήλ","selected":false}},"Στολίδης Παντελεήμων":{"name":"Στολίδης Παντελεήμων","location":"Επισκοπή, 70008","telephone":"2810771006","place":{"lat":35.2570701,"lng":25.23755940000001,"title":"Στολίδης Παντελεήμων","selected":false}},"Μπορμπουδάκης Μιχαήλ":{"name":"Μπορμπουδάκης Μιχαήλ","location":"Ανάληψη, 70014","telephone":"2897024810","place":{"lat":35.331734,"lng":25.345269299999927,"title":"Μπορμπουδάκης Μιχαήλ","selected":false}},"Χόνδρος Χρήστος":{"name":"Χόνδρος Χρήστος","location":"Αγίου Ιωάννου 103, Σταλίδα, 70007","telephone":"2897032222","place":{"lat":35.2908065,"lng":25.442435400000022,"title":"Χόνδρος Χρήστος","selected":false}},"Χατζηδάκης Χαράλαμπος":{"name":"Χατζηδάκης Χαράλαμπος","location":"Κοκκίνη Χάνι, 71500","telephone":"2810761785","place":{"lat":35.3306826,"lng":25.256337400000007,"title":"Χατζηδάκης Χαράλαμπος","selected":false}},"Χαραλαμπάκης Θεόδωρος":{"name":"Χαραλαμπάκης Θεόδωρος","location":"Ελ. Βενιζέλου 33, Λιμήν Χερσονήσου, 70014 ","telephone":"2897022201","place":{"lat":35.3178226,"lng":25.389668400000005,"title":"Χαραλαμπάκης Θεόδωρος","selected":false}},"Κρασάκης Ιωάννης":{"name":"Κρασάκης Ιωάννης","location":"Δημοκρατίας 113, Μάλια, 70007","telephone":"2897031900","place":{"lat":35.2883748,"lng":25.46168720000003,"title":"Κρασάκης Ιωάννης","selected":false}},"Φεύγας Παναγιώτης":{"name":"Φεύγας Παναγιώτης","location":"Επισκοπή, 70008","telephone":"2810771712","place":{"lat":35.2570701,"lng":25.23755940000001,"title":"Φεύγας Παναγιώτης","selected":false}},"Αλέξης Απόστολος":{"name":"Αλέξης Απόστολος","location":"Μοχός, 70005","telephone":"2897061301","place":{"lat":35.2632695,"lng":25.42266970000003,"title":"Αλέξης Απόστολος","selected":false}},"Χαραλαμπάκης Χρήστος":{"name":"Χαραλαμπάκης Χρήστος","location":"Ελ. Βενιζέλου 33, Λιμήν Χερσονήσου, 70014 ","telephone":"2897022201","place":{"lat":35.3178226,"lng":25.389668400000005,"title":"Χαραλαμπάκης Χρήστος","selected":false}},"Μπελιβάνη-Δήμου Σταυρούλα":{"name":"Μπελιβάνη-Δήμου Σταυρούλα","location":"Μάλια, 70007","telephone":"2897031000","place":{"lat":35.2831684,"lng":25.462869400000045,"title":"Μπελιβάνη-Δήμου Σταυρούλα","selected":false}},"Φριντζίλα Μαρία":{"name":"Φριντζίλα Μαρία","location":"Καρτερός, Έναντι παραλίας ΕΟΤ, 71500","telephone":"2810381952","place":{"title":"Φριντζίλα Μαρία","lat":35.293024440481446,"lng":25.33587330175783,"selected":false}},"Γουσιάδη Χρυσούλα":{"name":"Γουσιάδη Χρυσούλα","location":"Κάτω Γούβες, 70014","telephone":"2897041680","place":{"lat":35.32944519999999,"lng":25.313214000000016,"title":"Γουσιάδη Χρυσούλα","selected":false}},"Χατζάκης Μιχαήλ":{"name":"Χατζάκης Μιχαήλ","location":"Ελ. Βενιζέλου 127, Λιμήν Χερσονήσου, 70014 ","telephone":"2897023420","place":{"lat":35.3143256,"lng":25.394850399999996,"title":"Χατζάκης Μιχαήλ","selected":false}},"Μπελιβάνης Εμμανουήλ":{"name":"Μπελιβάνης Εμμανουήλ","location":"Ελ. Βενιζέλου 146, Μάλια, 70007","telephone":"2897031590","place":{"lat":35.2835185,"lng":25.462071599999945,"title":"Μπελιβάνης Εμμανουήλ","selected":false}},"Δρακάκης Ιωάννης":{"name":"Δρακάκης Ιωάννης","location":"Ευρώπης, Άνω Χερσόνησος, 70014 ","telephone":" 289702392","place":{"lat":35.315826,"lng":25.39283899999998,"title":"Δρακάκης Ιωάννης","selected":false}},"Θεοδωρίδης Ιορδάνης":{"name":"Θεοδωρίδης Ιορδάνης","location":"Ελ. Βενιζέλου 16, Λιμήν Χερσονήσου, 70014 ","telephone":"2897023196","place":{"lat":35.3174524,"lng":25.39077199999997,"title":"Θεοδωρίδης Ιορδάνης","selected":false}},"Ρουσάκη Μαρίνα":{"name":"Ρουσάκη Μαρίνα","location":"25ης Μαρτίου, Μάλια, 70007","telephone":"2897033333","place":{"lat":35.2828709,"lng":25.464021799999955,"title":"Ρουσάκη Μαρίνα","selected":false}},"Κανακάκης Λάμπρος":{"name":"Κανακάκης Λάμπρος","location":"Ελ. Βενιζέλου 206, Λιμήν Χερσονήσου, 70014 ","telephone":"2897029136","place":{"lat":35.3117506,"lng":25.39805750000005,"title":"Κανακάκης Λάμπρος","selected":false}},"Χαραλαμπάκη Παναγιώτα":{"name":"Χαραλαμπάκη Παναγιώτα","location":"Ελ. Βενιζέλου 174, Μάλια, 70007","telephone":"2897031332","place":{"lat":35.2838804,"lng":25.4631081,"title":"Χαραλαμπάκη Παναγιώτα","selected":false}},"Πατιτάκης Αντώνιος":{"name":"Πατιτάκης Αντώνιος","location":"Στάση Χατζή, Κοκκίνη Χάνι, 71500","telephone":"2810761123","place":{"title":"Πατιτάκης Αντώνιος","lat":35.293024440481446,"lng":25.313214000000016,"selected":false}},"Λαμπράκη Γεωργία":{"name":"Λαμπράκη Γεωργία","location":"Ελ. Βενιζέλου 73, Λιμήν Χερσονήσου, 70014 ","telephone":"2897022473","place":{"lat":35.3163901,"lng":25.392224599999963,"title":"Λαμπράκη Γεωργία","selected":false}},"Πλατανάκη Μαρία":{"name":"Πλατανάκη Μαρία","location":"Ελ. Βενιζέλου 105, Λιμήν Χερσονήσου, 70014 ","telephone":"2897022268","place":{"lat":35.3152881,"lng":25.39369910000005,"title":"Πλατανάκη Μαρία","selected":false}},"Σαλτάρη Κωνσταντίνα":{"name":"Σαλτάρη Κωνσταντίνα","location":"Βαθειανός Κάμπος, Κοκκίνη Χάνι, 71500","telephone":"2810762325","place":{"lat":35.3305556,"lng":25.25,"title":"Σαλτάρη Κωνσταντίνα","selected":false}},"Σολογάνης Παράσχος":{"name":"Σολογάνης Παράσχος","location":"Κάτω Γούβες, 70014","telephone":"2897041100","place":{"lat":35.32944519999999,"lng":25.313214000000016,"title":"Σολογάνης Παράσχος","selected":false}}};
var efimeriesByPharmacy = efimeries.groupBy(function(e){return e.get('pharmacy').name;});
_.each(efimeriesByPharmacy, function(ep,i) {
    var phV = new PharmacyView({
        model: new Pharmacy(pharmacies[i])
    });
    _.each(ep,function(e) {
        e.pharmacyView = phV;
    });
});
var currentDate = new Date();
var plusDays = function(date, days) {
    result = new Date(date.getTime());
    result.setTime(result.getTime() + days*24*60*60*1000);
    return result;
};
efimeries.forEach(function(e) {
    var dateObject = new Date(e.get('date'));
    e.set('dateObject', dateObject);
    var formatedDate = dateObject.getDate() + '/' + (dateObject.getMonth()+1) + '/' + dateObject.getFullYear();
    e.set('date', formatedDate);
    if(plusDays(dateObject, (e.get('nightWatch'))?1:0) < currentDate) {
        e.set('hide', true);
    }
});
var EfimeriesView = Backbone.View.extend({
    tagName: 'table',
    className: 'table table-striped',
    initialize: function() {
        this.collection.on('reset', this.render, this);
    },
    render: function() {
        $(this.el).empty();
        this.collection.forEach(function(e) {
            if (!e.get('hide')) {
                var v = new EfimeriaView({model: e});
                $(this.el).append(v.render().el);
                var pV = e.pharmacyView;
            }
        }, this);
        return this;
    }
});
var Tab = Backbone.Model.extend({});
var TabView = Backbone.View.extend({
    className: 'tab btn btn-default',
    initialize: function () {
        var myEfimeries = this.model.get('efimeries');
        this.efimeriesView = new EfimeriesView({collection: myEfimeries});
        var dateTabsModel = new DateTabs();
        dateTabsModel.efimeries = myEfimeries;
        this.dateTabsView = new DateTabsView({collection: dateTabsModel});
        this.changeDateTab = function () {
            $('.date-tabs.selected').removeClass('selected');
            $(this.dateTabsView.el).addClass('selected');
        };
    },
    events: {
        'click': function() {
            $('.'+this.className.replace(/(\S+)\s.*$/, "$1")+'.selected').removeClass('selected');
            $(this.el).addClass('selected');
            $('#efimeries-tables').find('.selected').removeClass('selected');
            $(this.efimeriesView.el).addClass('selected').parent().scrollTop(0);
            if(this.changeDateTab)
                this.changeDateTab();
        }
    },
    render: function() {
        $(this.el).html('<span>'+this.model.get('tabName')+'</span>');
        return this;
    }
});
var DateTab = Backbone.Model.extend({});
var DateTabView = TabView.extend({
    className: 'date-tab btn btn-default btn-block',
    initialize: function() {
        var myEfimeries = this.model.get('efimeries');
        this.efimeriesView = new EfimeriesView({collection: myEfimeries});
    }
});
var Tabs = Backbone.Collection.extend({
    model: Tab,
    groupByFunction: function(e) {
        return e.get('district');
    },
    efimeries: efimeries,
    createGroups: function() {
        var groups = this.efimeries.groupBy(this.groupByFunction, this);
        Object.keys(groups).forEach(function(k) {
            var e =  new Efimeries();
            e.reset(groups[k]);
            var t = new this.model({
                tabName: k,
                efimeries: e
            });
            this.add(t);
        }, this);
    }
});
var TabsView = Backbone.View.extend({
    id: 'efimeries-app',
    initialize: function() {
        this.collection.createGroups();
    },
    efimeriesTables: $('<div>', {id: 'efimeries-tables'}),
    tabsDiv: $('<div>', {id: 'district-tabs'}),
    append: function () {
        $(this.el).append(this.tabsDiv).append(this.efimeriesTables);
    },
    render: function() {
        $(this.el).empty();
        this.collection.forEach(function (t, i) {
            var tV = new TabView({model: t});
            var tab = tV.render().el;
            this.tabsDiv.append(tab);

            var dateTabs = tV.dateTabsView.render().el;
            $(this.el).append(dateTabs);

            var table = tV.efimeriesView.render().el;
            if (i === 0) {
                $(tab).addClass('selected');
                $(table).addClass('selected');
                $(dateTabs).addClass('selected');
            }
            this.efimeriesTables.append(table);
        }, this);
        this.append();
        return this;
    }
});
var DateTabs = Tabs.extend({
    model: DateTab,
    groupByFunction: function(e, i) {
        var date = e.get('dateObject');

        function dayString(date) {
            var months = ['Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μάι', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοέ', 'Δεκ'];
            return date.getDate() + '-' + months[date.getMonth()];
        }
        function atDayStart(d) {
            d.setTime(d.setTime(d.getTime()- d.getTime()%(1000*60*60*24)));
            return d;
        }
        if(i === 0 && e.get('hide')) {
            var firstNotHidden = this.efimeries.find(function(e) {
                return !e.get('hide');
            });
            if(firstNotHidden)
                date = firstNotHidden.get('dateObject');
        }
        if(i === 0 || date > lastDate) {
            firstDate = atDayStart(date);
            lastDate = atDayStart(plusDays(firstDate, 7));
            lastDate.setTime(lastDate.getTime()-1+lastDate.getTimezoneOffset()*60*1000);
        }
        return dayString(firstDate) + ' - ' + dayString(lastDate) ;
    }
});
var DateTabsView = TabsView.extend({
    id: '',
    className: 'date-tabs',
    render: function() {
        this.collection.forEach(function(e) {
            if (!e.get('efimeries').every(function(e) { return e.get('hide');})) {
                var dTV = new DateTabView({model: e});
                var dateTab = dTV.render().el;
                $(this.el).append(dateTab);

                var table = dTV.efimeriesView.render().el;
                this.efimeriesTables.append(table);
            }
        },this);
        return this;
    }
});
var tabs = new Tabs();
var tabsView = new TabsView({collection: tabs});

var efimeriesView = new EfimeriesView({collection: efimeries});
$('body').html(tabsView.render().el);

$(window).on('load', function() {
    $('.tab').each(function(i, e) {
        var el = $(e);
        el.css('padding-top', (el.height() - el.children('span').height())/2);
    });
});