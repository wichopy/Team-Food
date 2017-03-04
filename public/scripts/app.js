$(document).ready(() => {

  $(".login").hide()
  $("#already").on("click", function () {
    $("#already").hide();
    $(".register").hide();
    $(".login").show(400);

  });
  // $(".list-group-item").hide();

  $("#grocery-list").on("click", ".trashbutton", function (ev) {
    console.log(ev.target);
    $(ev.target).closest(".input-group").remove();
  });

  $("#grocery-list").on('click', (ev) => {
    ev.preventDefault();
    // console.log($(ev.target).serialize());
    if (ev.target.id === "save") {
      ev.preventDefault();
      $(".list-group-item").each( function () {
        var currentLi = $(this);
        // console.log(currentLi.text());
        if(currentLi.text() === "" ){
          // console.log($(this).val());
          currentLi.html(`<span class="state-icon glyphicon glyphicon-unchecked"></span><input type="checkbox" class="hidden"> ${$(".food-item").val()}`);
          return false;
        }
        // .html(`<span class="state-icon glyphicon glyphicon-unchecked"></span><input type="checkbox" class="hidden"> ${$(".food-item").val()}`)


      });
      // $.ajax({
      //   url: "/food/shopping",
      //   method: 'POST',
      //   data: $("#grocery-list").serialize()
      // }).then((res) => {
      //   console.log('sucessful post');
      // }).catch((err) => {
      //   console.error(err);
      // });
    }
    if (ev.target.id === "clear") {
      $(".input-group").remove();
      $('#purchased').after(`<div class="input-group">
       <span class="input-group-addon">
        <input type="checkbox">
      </span>
      <input type="text" class="form-control food-item" name="food-item" data-row="${i}" value = "">
      <input type="number" class="form-control food-qty" name="food-qty" placeholder="qty">
      <button type="button" class="btn btn-default trashbutton">
        <i class="fa fa-trash-o"></i>
      </button>
    </div>`);

    }
    if (ev.target.id === "purchased") {
      event.preventDefault();
      var checkedItems = [];
      console.log($(".checked-list-box li.active"))
      $(".checked-list-box li.active").each(function(idx, li) {

          checkedItems.push($(li).text());
      });
      console.log(checkedItems);
      $.ajax({
        url: "/food/inventory",
        method: 'POST',
        data: { 'food-item': checkedItems }
      }).then((res) => {
        console.log('sucessful post');
      }).catch((err) => {
        console.error(err);
      });
    }
  });
  // $(function () {
    $('.list-group.checked-list-box .list-group-item').each(function () {

        // Settings
        var $widget = $(this),
            $checkbox = $('<input type="checkbox" class="hidden" />'),
            color = ($widget.data('color') ? $widget.data('color') : "primary"),
            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        $widget.css('cursor', 'pointer')
        $widget.append($checkbox);

        // Event Handlers
        $widget.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });


        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $widget.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$widget.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
            } else {
                $widget.removeClass(style + color + ' active');
            }
        }

        // Initialization
        function init() {

            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }

            updateDisplay();

            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        init();
    });

    $('#get-checked-data').on('click', function(event) {
        event.preventDefault();
        var checkedItems = {}, counter = 0;
        $("#check-list-box li.active").each(function(idx, li) {
            checkedItems[counter] = $(li).text();
            counter++;
        });
        $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
    });
// });

});
