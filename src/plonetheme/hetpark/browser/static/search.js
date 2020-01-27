/* The following line defines global variables defined elsewhere. */
/*globals require*/


if(require === undefined){
  require = function(reqs, torun){
    'use strict';
    return torun(window.jQuery);
  };
}

require([
  'jquery',
], function($) {
  'use strict';

  var $loader = $('.plone-loader');
  if($loader.size() === 0){
    $loader = $('<div class="plone-loader"><div class="loader"/></div>');
    $('body').append($loader);
  }

  var $filter = $('.actionMenu');
  var $filterBtn = $('#search-filter-toggle', $filter);
  var $advSearchInput = $('#advanced-search-input');
  var $ctSelectAll = $('#pt_toggle');
  
  var $ctOnView = $('#on_view_toggle');
  var $ctOnlyImages = $('#only_images_toggle');
  var $ctOnlyWebsite = $('#only_website_toggle');
  var $ctDisplayArchive = $('#display_past_events_toggle');
  var $ctDisplayArchiveRange = $("#display_past_events_range");
  var $ctDisplayEvents = $("#portal_type_Event");
  

  var $selectAllContainer = $('.search-type-options');
  var $onViewContainer = $('.on-view-options');
  var $onlyImagesContainer = $('.only-images-options');
  var $displayArchiveContainer = $('.display-archive-options');

  var $sortingContainer = $('#sorting-options');


  /* handle history */
  if (window.history && window.history.pushState){
    $(window).bind('popstate', function () {
      /* we're just going to cheat and reload the page so
         we aren't keep moving around state here.. 
         Here, I'm lazy, we're not using react here... */
      window.location = window.location.href;
    });
  }

  var pushHistory = function(){
    if(window.history && window.history.pushState){
      var url = window.location.origin + window.location.pathname + '?' + $('#searchform').serialize();
      window.history.pushState(null, null, url);
    }
  };

  var timeout = 0;
  var search = function(){
    $loader.show();
    pushHistory();
    $.ajax({
      url: window.location.origin + window.location.pathname + '?ajax_load=1',
      data: $('#searchform').serialize()
    }).done(function(html){
      var $html = $(html);
      $('#search-results').replaceWith($('#search-results', $html));
      $('#search-term').replaceWith($('#search-term', $html));
      $('#results-count').replaceWith($('#results-count', $html));

      try {
        if ($('#search-results-number').html() > 0) {
          $("#search-results-bar-wrapper").attr("style", "display:block");
        }
      } catch(error) {
      }

      $loader.hide();
    });
  };

  var searchDelayed = function(){
    clearTimeout(timeout);
    timeout = setTimeout(search, 200);
  };

  // for sorme reason the backend always flag with active class the sorting options
  var updateSortingState = function($el){
    $('a', $sortingContainer).removeClass('active');
    $el.addClass('active');
  };
  var default_sort = $('#search-results').attr('data-default-sort');
  updateSortingState($('a[data-sort='+default_sort+']'));

  /* sorting */
  $('a', $sortingContainer).click(function(e){
    e.preventDefault();
    updateSortingState($(this));
    var sort = $(this).attr('data-sort');
    var order = $(this).attr('data-order');
    if(sort){
      $('[name="sort_on"]').attr('value', sort);
      if(order && order == 'reverse'){
        $('[name="sort_order"]').attr('value', 'reverse');
      }else{
        $('[name="sort_order"]').attr('value', '');
      }
    }else{
      $('[name="sort_on"]').attr('value', '');
      $('[name="sort_order"]').attr('value', '');
    }
    search();
  });


  /* form submission */
  $('.searchPage').submit(function(e){
    e.preventDefault();
    search();
  });

  /* filters */
  $filterBtn.click(function(e){
    e.preventDefault();
    $filter.toggleClass('activated');
    if($filter.hasClass('activated')){
      $advSearchInput.attr('value', 'True');
    }else{
      $advSearchInput.attr('value', 'False');
    }
  });

  var activate_display_archive = function(elem) {
    elem.checked = true;
    var defaultdate = $(elem).data('defaultdate');
    $(elem).attr('value', defaultdate);
    $ctDisplayArchiveRange.attr('name', 'start.range:record');
    $ctDisplayArchiveRange.attr('value', 'min');
  };

  var deactivate_display_archive = function(elem) {
    elem.checked = false;
    var defaultever = $(elem).data('defaultever');
    $(elem).attr('value', defaultever);
    $ctDisplayArchiveRange.attr('name', '');
    $ctDisplayArchiveRange.attr('value', '');
  };

  var deactivate_display_events = function() {
    $ctDisplayEvents[0].checked = false;
  };

  var activate_display_events = function() {
    $ctDisplayEvents[0].checked = true;
  };

  $ctDisplayArchive.change(function(){
    if($ctDisplayArchive[0].checked){
      activate_display_archive(this);
      activate_display_events();
    }else{
      deactivate_display_archive(this);
    }
  });

  $ctDisplayEvents.change(function() {
    if($ctDisplayEvents[0].checked){
      /* do nothing */
    } else {
      deactivate_display_archive($ctDisplayArchive[0]);
    }
  });

  $('input', $filter).change(function(){
    searchDelayed();
  });
});