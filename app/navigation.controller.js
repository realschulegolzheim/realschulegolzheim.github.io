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
        var siteUrl = golzheim_site_url;
        console.log("Configured site URL: " + siteUrl); // This comes via base_scripts.html include file

        $scope.locationpath = $location.path();
        $scope.locationwindow = window.location.href;

        var offline = true;
        if (offline) {
            $scope.data = getNavigationData(siteUrl + "/");
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

    function getNavigationData(baseurl) {
        var data = [
            { "name": "Aktuelles", "url": baseurl + "schule/00-aktuell-wichtig/" },
            { "name": "Wir stellen uns vor", "url": baseurl + "schule/01-vorstellung/", "children": [
                    { "name": "Begrüßung", "url": baseurl + "schule/01-vorstellung/01-begruessung/" },
                    { "name": "Sprech- und -Bürozeiten", "url": baseurl + "schule/01-vorstellung/02-sprech-und-buerozeiten/" },
                    { "name": "Organigramm", "url": baseurl + "schule/01-vorstellung/04-organigramm/" },
                    { "name": "Schulische Gremien", "url": baseurl + "schule/01-vorstellung/05-schulische-gremien/" },
                    { "name": "Pressespiegel", "url": baseurl + "schule/01-vorstellung/07-pressespiegel/" } ]
            },
            { "name": "Anmeldung", "url": baseurl + "schule/02-anmeldung/" },
            { "name": "Berufsorientierung", "url": baseurl + "schule/03-berufsorientierung/" },
            { "name": "Pädagogik", "url": baseurl + "schule/04a-paedagogik/", "children": [
                    { "name": "Schulhistorie", "url": baseurl + "schule/04a-paedagogik/01-schulgeschichte/" },
                    { "name": "Das Schulprogramm", "url": baseurl + "schule/04a-paedagogik/02a-schulprogramm/" },
                    { "name": "Das Lehrerraum-Prinzip", "url": baseurl + "schule/04a-paedagogik/02b-lehrerraum-prinzip/" },
                    { "name": "Das 67.5 Minutenraster", "url": baseurl + "schule/04a-paedagogik/02c-das-67-5-minuten-raster/" },
                    { "name": "Qualität - mehr als ein Modewort", "url": baseurl + "schule/04a-paedagogik/03-qualitaet/" },
                    { "name": "Partner und Patenschaften", "url": baseurl + "schule/04a-paedagogik/04-partner-und-patenschaften/" },
                    { "name": "Arbeitsgemeinschaften", "url": baseurl + "schule/04a-paedagogik/08-arbeitsgemeinschaften/" },
                    { "name": "Das Merkheft", "url": baseurl + "schule/04a-paedagogik/09-merkheft/" } ]
            },
            { "name": "Unterricht", "url": baseurl + "schule/04b-unterricht/", "children": [
                    { "name": "Unsere Schule in Zahlen", "url": baseurl + "schule/04b-unterricht/01-aktuelle-statistik/" },
                    { "name": "Unser Kollegium", "url": baseurl + "schule/04b-unterricht/02-kollegium/" },
                    { "name": "Schulordnung", "url": baseurl + "schule/04b-unterricht/03-schulordnung/" },
                    { "name": "Versetzungsordnung", "url": baseurl + "schule/04b-unterricht/04-versetzungsordnung/" },
                    { "name": "Kopfnoten", "url": baseurl + "schule/04b-unterricht/05-kopfnoten/" },
                    { "name": "Schulbücher und -material", "url": baseurl + "schule/04b-unterricht/06-schulmaterial/" },
                    { "name": "Schulbücherei/Medien", "url": baseurl + "schule/04b-unterricht/07-schulbuecherei/" },
                    { "name": "Schüleraustausch Frankreich", "url": baseurl + "schule/04b-unterricht/08-schueleraustausch-frankreich/" },
                    { "name": "Fahrtenangebote", "url": baseurl + "schule/04b-unterricht/09-fahrtenangebote/" },
                    { "name": "Galerie der Kunst-Klassen", "url": baseurl + "schule/04b-unterricht/10-galerie-der-kunst-klassen/" },
                    { "name": "Stundentafel", "url": baseurl + "schule/04b-unterricht/11-stundentafel/" },
                    { "name": "Lehrpläne", "url": baseurl + "schule/04b-unterricht/12-curriculum-undlehrplaene/" },
                    { "name": "Schüler helfen Schülern", "url": baseurl + "schule/04b-unterricht/13-schueler-helfen-schuelern/" },
                    { "name": "Ergänzungs- und Förderunterricht", "url": baseurl + "schule/04b-unterricht/14-ergaenzungs-und-foerderunterricht/" },
                    { "name": "Profil-Klassen", "url": baseurl + "schule/04b-unterricht/15-profilklassen/" },
                    { "name": "Schulsozialarbeit", "url": baseurl + "schule/04b-unterricht/16-schulsozialarbeit/" },
                    { "name": "Hilfe bei Lernstörungen", "url": baseurl + "schule/04b-unterricht/17-hilfe-bei-lernstoerungen/" },
                    { "name": "Hochbegabung", "url": baseurl + "schule/04b-unterricht/18-hochbegabung/" },
                    { "name": "Bunter Alltag", "url": baseurl + "schule/04b-unterricht/19-bunter-alltag/" }
                ]
            },
            { "name": "Schul-Laufbahn", "url": baseurl + "schule/04c-schullaufbahn/", "children": [
                    { "name": "Anmeldung", "url": baseurl + "schule/04c-schullaufbahn/01-anmeldung/" },
                    { "name": "Sanfter Übergang - Lernen lernen!", "url": baseurl + "schule/04c-schullaufbahn/02-sanfter-uebergang/" },
                    { "name": "Startprojekt Ich/Wir/Eine Welt", "url": baseurl + "schule/04c-schullaufbahn/03-startprojekt-ich-wir-einewelt/" },
                    { "name": "Erprobungsstufe Klasse 5 und 6", "url": baseurl + "schule/04c-schullaufbahn/04-erprobungsstufe-klasse-5-und-6/" },
                    { "name": "Differenzierung ab Klasse 7", "url": baseurl + "schule/04c-schullaufbahn/05-differenzierung-ab-klasse-7/" },
                    { "name": "Lernstandserhebungen in Klasse 8", "url": baseurl + "schule/04c-schullaufbahn/06-lernstandserhebungen-in-klasse-8/" },
                    { "name": "Praktika", "url": baseurl + "schule/04c-schullaufbahn/07-praktika/" },
                    { "name": "Berufsvorbereitung", "url": baseurl + "schule/04c-schullaufbahn/08-berufsvorbereitung/" },
                    { "name": "Zentrale Prüfungen in Klasse 10", "url": baseurl + "schule/04c-schullaufbahn/09-zentrale-pruefungen-in-klasse-10/" },
                    { "name": "Abschlüsse der Realschule", "url": baseurl + "schule/04c-schullaufbahn/10-abschluesse-der-realschule/" }
                ]
            },
            { "name": "Projekte", "url": baseurl + "schule/04d-projekte/", "children": [
                    { "name": "Nachhaltigkeit im Schulalltag", "url": baseurl + "schule/04d-projekte/01-nachhaltigkeit-im-schulalltag/" },
                    { "name": "Schulprofil Gesund lernen", "url": baseurl + "schule/04d-projekte/02-schulprofil-gesund-lernen/" },
                    { "name": "Nachdenkraum-Projekt", "url": baseurl + "schule/04d-projekte/03-nachdenkraum-projekt/" },
                    { "name": "Streitschlichter-Projekt", "url": baseurl + "schule/04d-projekte/04-streitschlichter-projekt/" },
                    { "name": "Gewaltpräventionsprojekt", "url": baseurl + "schule/04d-projekte/05-gewaltpraevention/" },
                    { "name": "Vorlesewettbewerb", "url": baseurl + "schule/04d-projekte/06-vorlesewettbewerb/" },
                    { "name": "Big Challenge", "url": baseurl + "schule/04d-projekte/07-big-challenge/" },
                    { "name": "DELF Zertifikat", "url": baseurl + "schule/04d-projekte/08-delf-zertifikat/" },
                    { "name": "Känguruh der Mathematik", "url": baseurl + "schule/04d-projekte/09-kaenguru-der-mathematik/" },
                    { "name": "Sponsorenlauf", "url": baseurl + "schule/04d-projekte/10-sponsorenlauf/" },
                    { "name": "Togo-Projekt", "url": baseurl + "schule/04d-projekte/11-togo-projekt/" },
                    { "name": "Sportveranstaltungen", "url": baseurl + "schule/04d-projekte/12-sportveranstaltungen/" }
                ]
            },
            { "name": "Termine", "url": baseurl + "schule/05-termine/" },
            { "name": "Schul-Check", "url": baseurl + "schule/06-schulcheck/" },
            { "name": "Eltern", "url": baseurl + "schule/07-eltern/", "children": [
                    { "name": "Schulpflegschaft", "url": baseurl + "schule/07-eltern/01-schulpflegschaft/" },
                    { "name": "Klassenpflegschaft", "url": baseurl + "schule/07-eltern/02-klassenpflegschaft/" },
                    { "name": "Fachkonferenzen", "url": baseurl + "schule/07-eltern/03-fachkonferenzen/" },
                    { "name": "Förderverein der Schule", "url": baseurl + "schule/07-eltern/04-foerderverein/" }
                ]
            },
            { "name": "Schüler", "url": baseurl + "schule/08-schueler/", "children": [
                  { "name": "Wir nehmen Einfluss!", "url": baseurl + "schule/08-schueler/01-wir-nehmen-einfluss/" },
                  { "name": "Wir wollen's wissen!", "url": baseurl + "schule/08-schueler/02-wir-wollen-es-wissen/" },
                  { "name": "Wir können was!", "url": baseurl + "schule/08-schueler/03-wir-koennen-was/" },
                  { "name": "Wir sind gut drauf! Meistens...", "url": baseurl + "schule/08-schueler/04-wir-sind-gut-drauf--meistens/" }
                ]
            },
            { "name": "Lehrer", "url": baseurl + "schule/09-lehrer/" },
            { "name": "Wichtige Links und Adressen!", "url": baseurl + "schule/10-adressen/", "children": [
                    { "name": "Üben & Lernen", "url": baseurl + "schule/10-adressen/01-ueben-und-lernen/" },
                    { "name": "Downloads", "url": baseurl + "schule/10-adressen/02-arbeitsmaterialien-zum-download/" },
                    { "name": "Institutionen", "url": baseurl + "schule/10-adressen/03-institutionen/" },
                    { "name": "Schulbücher", "url": baseurl + "schule/10-adressen/04-schulbuecher-kaufen/" },
                    { "name": "Links zur Ausbildungsplatzsuche", "url": baseurl + "schule/10-adressen/05-links-zur-ausbildungsplatzsuche/" },
                    { "name": "Links zur Schule", "url": baseurl + "schule/10-adressen/06-links-rund-um-schule-und-familie/" }
                ]
            },
            { "name": "Impressum", "url": baseurl + "impressum/" },
            { "name": "Haftungsausschluss", "url": baseurl + "haftungsausschluss/" },
            { "name": "Häufig gestellte Fragen", "url": baseurl + "haeufig-gestellte-fragen/" },
            { "name": "Archiv", "url": baseurl + "archiv/" }
        ];

        return data;
    }
})();
