$(document).ready(function () {

  $('.modal').modal();
  $('.collapsible').collapsible();
  $('.tooltipped').tooltip();
  // page is now ready, initialize the calendar...

  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listWeek'
    },
    defaultView: 'agendaWeek',
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    eventLimit: true, // allow "more" link when too many events
    weekends: false,
    allDaySlot: false,
    minTime: '08:00:00',
    maxTime: '20:00:00',
    events: [
      {
        /*
        id: 'restricaoIsabella',
        start: '10:00:00',
        end: '16:00:00',
        rendering: 'background'
        */
      }
    ],
    drop: function () {
      // remove the element from the "Draggable Events" list
      $(this).remove();
    },
    selectable: true,
    selectHelper: true,
    select: function (start, end) {
      var title = prompt('Event Title:');
      var eventData;
      if (title) {
        eventData = {
          title: title,
          start: start,
          end: end
        };
        $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
      }
      $('#calendar').fullCalendar('unselect');
    }
  });

  $('#external-events .blue').each(function () {
    // store data so the calendar knows to render an event upon drop
    $(this).data('event', {
      title: $.trim($(this).text()), // use the element's text as the event title
      duration: "01:00",
      stick: true, // maintain when user navigates (see docs on the renderEvent method)
      color: '#2196f3', 
      constraint: $.trim($(this).text())
    });
    // make the event draggable using jQuery UI
    $(this).draggable({
      zIndex: 999,
      revert: true,      // will cause the event to go back to its
      revertDuration: 0  //  original position after the drag
    });

  });

  $('#external-events').on('mousedown', '.fc-event', function(){
    var schedule = JSON.parse($(this).attr('data-schedule'));
    schedule.forEach(function(event) {
      $('#calendar').fullCalendar('renderEvent', event);
    });
  });

  $('#external-events').on('mouseup', '.fc-event', function(){
    var id = $(this).attr('data-id');
    $('#calendar').fullCalendar('removeEvents', id);
  });

});
