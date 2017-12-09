angular.module('311AppParent').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/assessment.html',
    "<!--<div ng-if=\"colors && items && assessments\">--><div ng-class=\"show ? '' : 'force-no-print'\"><h1>{{student['FirstName']}} {{student['LastName']}}'s {{type}} Progress <small>{{student.Crew}} Crew</small></h1><div class=\"form-group row no-print\" ng-if=\"edit\"><div class=\"col-sm-12\"><div class=\"input-group\" style=\"max-width: 500px\"><span class=\"input-group-addon\" id=\"basic-addon1\"><i class=\"fa fa-fw fa-link\"></i></span> <input type=\"text\" class=\"form-control\" aria-describedby=\"basic-addon1\" ng-model=\"link\" ng-click=\"linkClick($event)\"></div></div></div><span ng-repeat=\"color in colors\"><style>.color-{{color.id}} {\n" +
    "      background-color: #{{color.Code}} !important;\n" +
    "    }</style></span><div class=\"row assessments\"><div class=\"col-xs-12 col-lg-8\"><!--<table ng-if=\"assessments.length\" class=\"table table-striped\">\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th class=\"color-swatch\"><span></span></th>\n" +
    "        <th class=\"date\">Date</th>\n" +
    "        <th>Total</th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "      <tr ng-repeat=\"item in assessments\">\n" +
    "        <td class=\"color-swatch\"><span class=\"color-{{item.Color[0]}}\">&nbsp;</span></td>\n" +
    "        <td class=\"date\">{{item.Date | date:'MMMM d yyyy'}}</td>\n" +
    "        <td>{{item.sum || 0}}</td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>--><div class=\"list-group\" ng-if=\"assessments\"><a ng-repeat=\"item in assessments\" title=\"Edit this assessment\" ng-click=\"clickAssessment(item)\" ng-class=\"assessment && assessment.id == item.id ? 'active' : ''\" class=\"list-group-item list-group-item list-group-item-action\"><span class=\"color-swatch color-{{item.Color[0]}}\" class=\"btn\"></span> {{item.Date | date:'MMMM d yyyy'}} <span class=\"label label-default pull-right\">{{item.sum || 0}}</span></a></div></div><div class=\"col-xs-6 no-print\" ng-if=\"!assessment && edit\"></div></div><p class=\"no-print\" ng-if=\"!assessment && edit\"><button class=\"btn btn-primary\" ng-click=\"newAssessment()\"><i class=\"fa fa-fw fa-plus-circle\"></i>Create New Assessment</button></p><form class=\"assessment\" ng-class=\"!assessment ? 'form-disabled' : ''\"><div ng-if=\"assessment\" class=\"no-print\"><h2 ng-if=\"assessment.id\">Edit Assessment from {{assessment.Date | date:'MMMM d yyyy'}}</h2><h2 ng-if=\"!assessment.id\">Create new Assessment</h2><div class=\"form-group row\"><div class=\"col-sm-12\"><button class=\"btn btn-primary\" ng-click=\"saveAssessment(assessment)\"><i class=\"fa fa-fw fa-floppy-o\"></i>Save</button> <button class=\"btn\" ng-click=\"cancelAssessment()\">Cancel</button></div></div><div class=\"form-group row\"><label class=\"col-sm-12 col-form-label\">Date</label><div class=\"col-sm-4\"><input type=\"date\" class=\"form-control\" ng-model=\"assessment.Date\"></div></div><div class=\"form-group row\"><label class=\"col-sm-12 col-form-label\">Color</label><div class=\"col-sm-10 list-colors\"><a class=\"btn btn-default\" ng-repeat=\"color in colors\" title=\"{{color.Label}}\" ng-click=\"setColor(color)\" ng-class=\"assessment.Color[0] == color.id ? 'active' : ''\" ng-style=\"{backgroundColor: '#' + color.Code}\">&nbsp;</a></div></div><style>.list-items .active{\n" +
    "        background-color: #{{activeColor.Code}} !important;\n" +
    "      }</style></div><div class=\"list-group list-items\" ng-repeat=\"group in groups\" ng-if=\"assessment || assessments.length\"><h4>{{group.Label}}</h4><a ng-repeat=\"item in items\" ng-if=\"item.Group[0] == group.id\" class=\"btn btn-default\" ng-click=\"toggleWord(item.id)\" ng-class=\"assessment && assessment.Items.indexOf(item.id) != -1 ? 'active' : (disabledItems[item.id] ? 'disabled color-' + disabledItems[item.id] : '' )\">{{item.Item}}</a></div><div ng-if=\"assessment\" class=\"no-print form-group row\"><div class=\"col-sm-12\"><button class=\"btn btn-primary\" ng-click=\"saveAssessment(assessment)\"><i class=\"fa fa-fw fa-floppy-o\"></i>Save</button> <button class=\"btn\" ng-click=\"cancelAssessment()\">Cancel</button></div></div></form></div>"
  );


  $templateCache.put('views/print.html',
    "<div class=\"print\"><div class=\"alert alert-info no-print\" role=\"alert\"><h1 ng-class=\"loading ? '' : 'force-no-print'\" class=\"no-print\"><i class=\"fa fa-fw fa-spinner fa-spin\"></i>Loading {{total}} students...</h1><p>This will print Words and Letters reports for {{total}} students and will require at most <strong>{{total*2}}</strong> sheets of paper</p><p ng-class=\"loading ? 'force-no-print' : ''\"><button onclick=\"window.print()\" class=\"btn btn-primary\"><i class=\"fa fa-fw fa-print\"></i>Print all</button></p></div><div ng-repeat=\"student in students\"><div assessment type=\"words\" student=\"student\" print=\"true\"></div><div assessment type=\"letters\" student=\"student\" print=\"true\"></div></div></div>"
  );


  $templateCache.put('views/students.html',
    "<form class=\"form-inline\"><div class=\"form-group no-print\"><button class=\"btn btn-primary\" ng-click=\"print()\"><i class=\"fa fa-fw fa-print\"></i>Print Selected</button></div><div class=\"form-group\"><input class=\"form-control\" ng-model=\"query\" placeholder=\"Filter by Stuent Name or Crew\"></div></form><hr class=\"no-print\"><table class=\"table table-striped\"><thead><tr><th><input type=\"checkbox\" ng-model=\"checkall\" ng-click=\"checkallClick()\"></th><th><a ng-click=\"setSort('LastName', $event)\" href=\"#\">Name</a></th><th class=\"hidden-xs-down\"><a ng-click=\"setSort('Crew', $event)\" href=\"#\">Crew</a></th><th><a ng-click=\"setSort('LastWordsAssessment', $event)\" href=\"#\">Words</a></th><th><a ng-click=\"setSort('LastLettersAssessment', $event)\" href=\"#\">Letters</a></th><th class=\"hidden-xs-down\"><a ng-click=\"setSort('TotalLetters', $event)\" href=\"#\">Total Letters</a></th></tr></thead><tbody><tr ng-repeat=\"student in students | filter: query | orderBy: order\"><td><input type=\"checkbox\" ng-model=\"student.selected\"></td><td>{{student['LastName']}}, {{student['FirstName']}}</td><td class=\"hidden-xs-down\">{{student.Crew}}</td><td><a ui-sref=\"editAssessment({type: 'words', student: student.id})\"><span ng-if=\"student['LastWordsAssessment']\"><span class=\"hidden-xs-down\">Last:</span> {{student['LastWordsAssessment'] | date:'M/d/yyyy'}}</span> <span ng-if=\"!student['LastWordsAssessment']\">+ Create</span></a></td><td><a ui-sref=\"editAssessment({type: 'letters', student: student.id})\"><span ng-if=\"student['LastLettersAssessment']\"><span class=\"hidden-xs-down\">Last:</span> {{student['LastLettersAssessment'] | date:'M/d/yyyy'}}</span> <span ng-if=\"!student['LastLettersAssessment']\">+ Create</span></a></td><td class=\"hidden-xs-down\">{{student['TotalLetters']}}</td></tr></tbody></table>"
  );

}]);
