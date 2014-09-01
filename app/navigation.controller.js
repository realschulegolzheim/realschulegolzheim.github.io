(function () {
    'use strict';

    angular
        .module('app', []);

    angular
        .module('app')
        .config(["$interpolateProvider", function ($interpolateProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
        }]);


    angular
        .module('app')
        .controller('Navigation', ["$scope", "$http", "$location", Navigation]);

    function Navigation($scope, $http, $location) {
        $scope.locationpath = $location.path();
        $scope.locationwindow = window.location.href;

        var offline = true;
        if (offline) {
            $scope.data = getNavigationData();
            SetActiveClassAttribute($scope.data, $scope.locationwindow);
        } else {
            $http.get('api/Navigation').success(function (data) {
                $scope.data = data;
                SetActiveClassAttribute($scope.data, $scope.locationwindow);
            });
        }
    }

    function SetActiveClassAttribute(data, currentLocation) {
        var dataLength = data.length;
        for (var i = 0; i < dataLength; i++) {
            var item = data[i];
            var itemUrl = item.url.replace(/\/$/, '');
            item.active = (currentLocation.indexOf(itemUrl) > -1);
            if (item.active) {
                console.log("Treffer für " + itemUrl); // + " " + JSON.stringify(item, undefined, 2));
            }

            var children = item.children || [];
            SetActiveClassAttribute(children, currentLocation);
        }
    }

    function getNavigationData() {
        var data = [
            { "name": "Aktuell/Wichtig!", "url": "00-aktuell-wichtig/" },
            { "name": "Wir stellen uns vor", "url": "01-vorstellung/", "children": [
                    { "name": "Begrüßung", "url": "01-vorstellung/01-begruessung/" },
                    { "name": "Sprech- und -Bürozeiten", "url": "01-vorstellung/02-sprech-und-buerozeiten/" },
                    { "name": "Organigramm", "url": "01-vorstellung/04-organigramm/" },
                    { "name": "Schulische Gremien", "url": "01-vorstellung/05-schulische-gremien/" },
                    { "name": "Pressespiegel", "url": "01-vorstellung/07-pressespiegel/" } ]
            },
            { "name": "Anmeldung", "url": "02-anmeldung/" },
            { "name": "Berufsorientierung", "url": "03-berufsorientierung/" },
            { "name": "Pädagogik", "url": "04-paedagogik/", "children": [
                    { "name": "Schulhistorie", "url": "04-paedagogik/01-schulgeschichte/" },
                    { "name": "Das Schulprogramm", "url": "04-paedagogik/02-schulprogramm/" },
                    { "name": "Das Lehrerraum-Prinzip", "url": "04-paedagogik/02-schulprogramm/01-lehrerraum-prinzip/" },
                    { "name": "Das 67.5 Minutenraster", "url": "04-paedagogik/02-schulprogramm/02-das-67-5-minuten-raster/" },
                    { "name": "Qualität - mehr als ein Modewort", "url": "04-paedagogik/03-qualitaet/" },
                    { "name": "Partner und Patenschaften", "url": "04-paedagogik/04-partner-und-patenschaften/" },
                    { "name": "Arbeitsgemeinschaften", "url": "04-paedagogik/08-arbeitsgemeinschaften/" },
                    { "name": "Das Merkheft", "url": "04-paedagogik/09-merkheft/" } ]
            },
            { "name": "Unterricht", "url": "04-paedagogik/05-unterricht/", "children": [
                    { "name": "Unsere Schule in Zahlen", "url": "04-paedagogik/05-unterricht/01-aktuelle-statistik/" },
                    { "name": "Unser Kollegium", "url": "04-paedagogik/05-unterricht/02-kollegium/" },
                    { "name": "Schulordnung", "url": "04-paedagogik/05-unterricht/03-schulordnung/" },
                    { "name": "Versetzungsordnung", "url": "04-paedagogik/05-unterricht/04-versetzungsordnung/" },
                    { "name": "Kopfnoten", "url": "04-paedagogik/05-unterricht/05-kopfnoten/" },
                    { "name": "Schulbücher und -material", "url": "04-paedagogik/05-unterricht/06-schulmaterial/" },
                    { "name": "Schulbücherei/Medien", "url": "04-paedagogik/05-unterricht/07-schulbuecherei/" },
                    { "name": "Schüleraustausch Frankreich", "url": "04-paedagogik/05-unterricht/08-schueleraustausch-frankreich/" },
                    { "name": "Fahrtenangebote", "url": "04-paedagogik/05-unterricht/09-fahrtenangebote/" },
                    { "name": "Galerie der Kunst-Klassen", "url": "04-paedagogik/05-unterricht/10-galerie-der-kunst-klassen/" },
                    { "name": "Stundentafel", "url": "04-paedagogik/05-unterricht/11-stundentafel/" },
                    { "name": "Lehrpläne", "url": "04-paedagogik/05-unterricht/12-curriculum-undlehrplaene/" },
                    { "name": "Schüler helfen Schülern", "url": "04-paedagogik/05-unterricht/13-schueler-helfen-schuelern/" },
                    { "name": "Ergänzungs- und Förderunterricht", "url": "04-paedagogik/05-unterricht/14-ergaenzungs-und-foerderunterricht/" },
                    { "name": "Profil-Klassen", "url": "04-paedagogik/05-unterricht/15-profilklassen/" },
                    { "name": "Schulsozialarbeit", "url": "04-paedagogik/05-unterricht/16-schulsozialarbeit/" },
                    { "name": "Hilfe bei Lernstörungen", "url": "04-paedagogik/05-unterricht/17-hilfe-bei-lernstoerungen/" },
                    { "name": "Hochbegabung", "url": "04-paedagogik/05-unterricht/18-hochbegabung/" },
                    { "name": "Bunter Alltag", "url": "04-paedagogik/05-unterricht/19-bunter-alltag/" }
                ]
            },
            { "name": "Schul-Laufbahn", "url": "04-paedagogik/06-schullaufbahn/", "children": [
                    { "name": "Anmeldung", "url": "04-paedagogik/06-schullaufbahn/01-anmeldung/" },
                    { "name": "Sanfter Übergang - Lernen lernen!", "url": "04-paedagogik/06-schullaufbahn/02-sanfter-uebergang/" },
                    { "name": "Startprojekt Ich/Wir/Eine Welt", "url": "04-paedagogik/06-schullaufbahn/03-startprojekt-ich-wir-einewelt/" },
                    { "name": "Erprobungsstufe Klasse 5 und 6", "url": "04-paedagogik/06-schullaufbahn/04-erprobungsstufe-klasse-5-und-6/" },
                    { "name": "Differenzierung ab Klasse 7", "url": "04-paedagogik/06-schullaufbahn/05-differenzierung-ab-klasse-7/" },
                    { "name": "Lernstandserhebungen in Klasse 8", "url": "04-paedagogik/06-schullaufbahn/06-lernstandserhebungen-in-klasse-8/" },
                    { "name": "Praktika", "url": "04-paedagogik/06-schullaufbahn/07-praktika/" },
                    { "name": "Berufsvorbereitung", "url": "04-paedagogik/06-schullaufbahn/08-berufsvorbereitung/" },
                    { "name": "Zentrale Prüfungen in Klasse 10", "url": "04-paedagogik/06-schullaufbahn/09-zentrale-pruefungen-in-klasse-10/" },
                    { "name": "Abschlüsse der Realschule", "url": "04-paedagogik/06-schullaufbahn/10-abschluesse-der-realschule/" }
                ]
            },
            { "name": "Projekte", "url": "04-paedagogik/07-projekte/", "children": [
                    { "name": "Nachhaltigkeit im Schulalltag", "url": "04-paedagogik/07-projekte/01-nachhaltigkeit-im-schulalltag/" },
                    { "name": "Schulprofil Gesund lernen", "url": "04-paedagogik/07-projekte/02-schulprofil-gesund-lernen/" },
                    { "name": "Nachdenkraum-Projekt", "url": "04-paedagogik/07-projekte/03-nachdenkraum-projekt/" },
                    { "name": "Streitschlichter-Projekt", "url": "04-paedagogik/07-projekte/04-streitschlichter-projekt/" },
                    { "name": "Gewaltpräventionsprojekt", "url": "04-paedagogik/07-projekte/05-gewaltpraevention/" },
                    { "name": "Vorlesewettbewerb", "url": "04-paedagogik/07-projekte/06-vorlesewettbewerb/" },
                    { "name": "Big Challenge", "url": "04-paedagogik/07-projekte/07-big-challenge/" },
                    { "name": "DELF Zertifikat", "url": "04-paedagogik/07-projekte/08-delf-zertifikat/" },
                    { "name": "Känguruh der Mathematik", "url": "04-paedagogik/07-projekte/09-kaenguru-der-mathematik/" },
                    { "name": "Sponsorenlauf", "url": "04-paedagogik/07-projekte/10-sponsorenlauf/" },
                    { "name": "Togo-Projekt", "url": "04-paedagogik/07-projekte/11-togo-projekt/" },
                    { "name": "Sportveranstaltungen", "url": "04-paedagogik/07-projekte/12-sportveranstaltungen/" }
                ]
            },
            { "name": "Termine", "url": "05-termine/" },
            { "name": "Schul-Check", "url": "06-schulcheck/" },
            { "name": "Eltern", "url": "07-eltern/", "children": [
                    { "name": "Schulpflegschaft", "url": "07-eltern/01-schulpflegschaft/" },
                    { "name": "Klassenpflegschaft", "url": "07-eltern/02-klassenpflegschaft/" },
                    { "name": "Fachkonferenzen", "url": "07-eltern/03-fachkonferenzen/" },
                    { "name": "Förderverein der Schule", "url": "07-eltern/04-foerderverein/" }
                ]
            },
            { "name": "Schüler", "url": "08-schueler/", "children": [
                  { "name": "Wir nehmen Einfluss!", "url": "08-schueler/01-wir-nehmen-einfluss/" },
                  { "name": "Wir wollen's wissen!", "url": "08-schueler/02-wir-wollen-es-wissen/" },
                  { "name": "Wir können was!", "url": "08-schueler/03-wir-koennen-was/" },
                  { "name": "Wir sind gut drauf! Meistens...", "url": "08-schueler/04-wir-sind-gut-drauf--meistens/" }
                ]
            },
            { "name": "Lehrer", "url": "09-lehrer/" },
            { "name": "Wichtige Links und Adressen!", "url": "10-adressen/", "children": [
                    { "name": "Üben & Lernen", "url": "10-adressen/01-ueben-und-lernen/" },
                    { "name": "Downloads", "url": "10-adressen/02-arbeitsmaterialien-zum-download/" },
                    { "name": "Institutionen", "url": "10-adressen/03-institutionen/" },
                    { "name": "Schulbücher", "url": "10-adressen/04-schulbuecher-kaufen/" },
                    { "name": "Links zur Ausbildungsplatzsuche", "url": "10-adressen/05-links-zur-ausbildungsplatzsuche/" },
                    { "name": "Links zur Schule", "url": "10-adressen/06-links-rund-um-schule-und-familie/" }
                ]
            }
        ];

        return data;
    }
})();
