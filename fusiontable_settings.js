/*!
 * Customization file for Fusion Table Mobile Templates
 * See maps_lib.js for license and repository
 *
 * REPLACE THE SETTINGS BELOW TO REFER TO YOUR OWN DATA.
 * 1. Fusion Table IDs
 * 2. Map Preferences
 * 3. Custom Content
 *   - Title
 *   - About Page
 *   - Infobox (popup when you click on a location)
 * 4. Search Settings
 *   - Default is a field for every column if you set this to nothing
 */

var MapsLib = MapsLib || {};
$.extend(MapsLib, {


  /////////////////////////
  // 1. FUSION TABLE IDs //
  /////////////////////////

  // Using v1 Fusion Tables API
  // See https://developers.google.com/fusiontables/docs/v1/migration_guide for more info

  // The encrypted Table ID of your Fusion Table (found under File => About)
  fusionTableId:      "1GBiESlYt_Lc9O5PLuLaii1L74HeY7G4O1fMh9OE",

  // *New Fusion Tables Requirement* API key. found at https://code.google.com/apis/console/
  // *Important* this key is for demonstration purposes. please register your own.
  googleApiKey:       "AIzaSyAMVBSXes-6P-gWaxRj20GK8NT6WDVpozM",

  // Name of the location column in your Fusion Table.
  // NOTE 1: if your location column name has spaces in it, surround it with single quotes
  // NOTE 2: if you have "latitude" and "longitude" columns, just use "latitude"
  locationColumn:     "Address",
  

  ////////////////////////
  // 2. MAP PREFERENCES //
  ////////////////////////

  // Center that your map defaults to
  mapDefaultCenter: new google.maps.LatLng(39.83, -98.58), // center of U.S.

  // Using Fusion Table's "zoom" levels, where X-1 covers twice the radius of X.
  // A zoom level of 14 = radius of 1 mile visible on an iPhone
  defaultZoom: 5,    // zoom level when using mapDefaultCenter

  // Comment out useNearbyLocation if you don't want to get the user's location.
  useNearbyLocation: {
    startAtNearbyLocation:  true,

    // onlyIfWithin: (comment out if you always want to use nearby location)
    // "X miles" or "X meters" = if we're within this distance from mapDefaultCenter, use nearby location.
    //                           otherwise, post boundsExceededMessage (if exists) and use mapDefaultCenter.
    onlyIfWithin:           "1500 miles",
    boundsExceededMessage:  "You're currently outside the continental United States.  Defaulting to geographical center.",

    // start at this zoom if starting at nearby location
    nearbyZoom:             10,

    // Snap to nearby zoom level when user hits "Nearby"?  Options are:
    // true               = always snap to zoom level
    // false (default)    = never snap to zoom level
    // int                = snap to zoom level if current zoom is more then specified levels away (X level = 2^X magnitude)
    snapToNearbyZoom:       3
  },


  ///////////////////////
  // 3. CUSTOM CONTENT //
  ///////////////////////

  // Title bar (including title of website)
  title: "U.S. Health Centers",

  aboutPage: " \
    <h3>About U.S. Health Centers</h3> \
    <p>This is a demonstration of a Mobile Template using Fusion Tables.  Developed by SF Brigade for Code For America, it's an adaptation of Derek Eder's searchable Fusion Table template, licensed under the <a href='https://github.com/derekeder/FusionTable-Map-Template/wiki/License' target='_blank'>MIT License</a>.  This particular application uses data from the <a href='http://datawarehouse.hrsa.gov/Download_HCC_LookALikes.aspx' target='_blank'>HRSA</a>.</p> \
    <p>To use this template for your own Fusion Table data, <a href='https://github.com/sfbrigade/FusionTable-Map-MobileTemplate' target='_blank'>clone this repository</a> and replace the fields inside fusiontable_settings.js to match your content.</p> \
    ",

  // This will go in your style block.  Useful if customizing your infoboxes.
  customCSS: " \
    .infobox-header, .ui-li-desc, #entity-text { font-family: Arial, Helvetica, Geneva, sans-serif; white-space:normal;} \
    .infobox-subheader { padding-top: 5px; } \
    .infobox-map { width:220px; } \
    .infobox-header { display:inline; padding-right: 10px; } \
    .moreinfo { margin-left:7px; min-width:18px; position:absolute; \
        top:45%; bottom:45%; min-height:18px; } \
    .entity { float:left; font-size:medium; padding:5px; border:1px solid black; margin:2px 7px 5px 0px; } \
    .entity.blue_box { background-color: #0060ed; color: white; } \
    .entity.red_box { background-color: #fb6155; color: white; } \
    .entity.orange_box { background-color: #ff9c00; color: white; } \
  ",


  // Handlebars template using the following variables:
  //  - row.COLUMN_NAME, returns value for given column in your FusionTable row
  //      - Note: COLUMN_NAME has periods omitted, and spaces replaced with underscores
  //      - So to get a value in the "U.S. Entity Type" column, use row.US_Entity_Type
  //  - isListView, which evaluates to:
  //      - false when populating a map infobox
  //      - true when populating an entry in "List" view

  // Set this to "" if you don't want infoboxes.
  // Comment out completely to fall back on the infobox format from Fusion Table
  customInfoboxTemplate: ' \
          {{#if isListView}} \
            <div> \
          {{else}} \
            <div class="infobox-map"> \
          {{/if}} \
          {{#compare row.Grantee_Organization_Type_Description "U.S. Government Entity" operator="=="}} \
            <div class="entity blue_box"><span id="entity-text">.gov</span></div> \
          {{else}} \
            {{#compare row.Grantee_Organization_Type_Description "Corporate Entity, Federal Tax Exempt" operator="=="}} \
              <div class="entity red_box"><span id="entity-text">.com</span></div> \
            {{else}} \
              <div class="entity orange_box"><span id="entity-text">.org</span></div> \
            {{/compare}} \
          {{/compare}} \
          <h4 class="infobox-header">{{row.Name}}</h4> \
          {{#if isListView}} \
            <p class="ui-li-desc infobox-subheader"> \
            {{row.Grantee_Organization_Type_Description}}<br> \
            {{row.Address}}</p> \
          {{else}} \
            <p></p><p class="ui-li-desc"> \
            {{row.Grantee_Organization_Type_Description}}<br> \
            {{row.Address}}<br> \
            {{#if row.URL}} \
              {{#compare row.URL "http://" operator="startswith"}} \
                <a href="{{row.URL}}" target="_blank">{{row.URL}}</a><br> \
              {{else}} \
                <a href="http://{{row.URL}}" target="_blank">{{row.URL}}</a><br> \
              {{/compare}} \
            {{/if}} \
            <a href="tel:1{{row.Telephone_Number}}">{{row.Telephone_Number}}</a></p> \
          {{/if}} \
          </p></div>',

  // Infoboxes will also appear (unless blank) on your nearby or search address pins.
  // HTML is OK.  Use "{address}" to denote the entered address for addressPinInfobox.
  nearbyPinInfobox: "You are here.",
  addressPinInfobox: "{address}",


  ////////////////////////
  // 4. SEARCH SETTINGS //
  ////////////////////////

  // Appended/Assumed for all address searches
  // Format: [City,] STATE.  (can be null/empty)  
  addressScope:      "", //San Francisco, CA",      

  // Search Page:
  // By default, you will get a text field for each column.
  // However, you can customize search settings using the following attributes:
  //
  //  - allColumns (default=true):            a text field will appear for each column.
  //
  //  - allColumnsExactMatch (default=false): allColumns + exact matching of fields.
  //
  //  - searchByAddress (default=true):       show address field for centering search
  // 
  //  - distanceFilter: drop-down for restricting search results by distance to address (or nearby).  Comment this out to have no such drop-down.
  //     - filterSearchResults (default=true): limit search results to those within distance
  //     - filterListResults (default=true): limit list results to those within distance (otherwise they're just ordered nearest-first)
  //     - dropDown: array of drop-down options for distance from address
  //       - Each entry is an array of [zoom level, label for drop-down, true if default selection]
  //       - You can specify zoom level 0 for an option to not filter by distance, and leave zoom as-is.
  //
  //  - dropDowns: array of custom drop-downs, where an entry has the following attributes:
  //       - label
  //       - options: array of drop-down entries.  Each entry is an array of [label, Fusion Table SQL-style WHERE clause, true if default selection]
  //       - see https://developers.google.com/fusiontables/docs/v1/sql-reference for Fusion Table-friendly WHERE clauses
  //
  //  - columns: array of column fields, where a field has the following attributes:
  //       - label
  //       - column: name of column
  //       - exact_match (default=false, meaningless if options is specified): look for exact match instead of a contains match
  //  If "allColumns" is true, "columns" will simply override label/match settings for the specified columns

  //searchPage: {} // use this to just get a text field for each column
  searchPage: { 
    allColumns: false,
    distanceFilter: { 
      dropDown: [ [0, "Anywhere", true], [13, "2 miles"], [11, "8 miles"], [7, "100 miles"], [5, "500 miles"] ]
    },
    dropDowns: [ 
      { label: "Organization Type", options: [
        ["Any", "", true],
        [".gov", "'Grantee Organization Type Description' = 'U.S. Government Entity'"],
        [".com", "'Grantee Organization Type Description' = 'Corporate Entity, Federal Tax Exempt'"],
        [".org", "'Grantee Organization Type Description' NOT EQUAL TO 'Corporate Entity, Federal Tax Exempt' AND 'Grantee Organization Type Description' NOT EQUAL TO 'U.S. Government Entity'"]
      ] }
    ]
    ,columns: [
      { label: "Name", column: "Name", exact_match: false }
    ]
  }

});