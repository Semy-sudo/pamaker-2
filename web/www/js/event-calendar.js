'use strict'

//Public Globals
const days = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
]
const months = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
]

let c_date = new Date()
let day = c_date.getDay()
let month = c_date.getMonth()
let year = c_date.getFullYear()

;(function App() {
  const calendar = `<div class="container">
            <div class="row">
                <div class="col-sm-6 col-12 d-flex">
                    <div class="card border-0 mt-5 flex-fill">
                        <div class="card-header py-3 d-flex justify-content-between">
                            <span class="prevMonth">&#10096;</span>
                            <span><strong id="s_m"></strong></span>
                            <span class="nextMonth">&#10097;</span>
                        </div>
                        <div class="card-body px-1 py-3">
                            <div class="table-responsive">
                                <table class="table table-sm table-borderless">
                                    <thead class="days text-center">
                                        <tr>
                                            ${Object.keys(days)
                                              .map(
                                                (key) =>
                                                  `<th><span>${days[
                                                    key
                                                  ].substring(
                                                    0,
                                                    1
                                                  )}</span></th>`
                                              )
                                              .join(
                                                ''
                                              )}                                            
                                        </tr>
                                    </thead>
                                    <tbody id="dates" class="dates text-center"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 col-12 d-flex pa-sm">
                    <div class="card border-0 mt-5 flex-fill d-none" id="event">
                        <div class="card-header py-3 text-center">
                            일정 추가
                            <button type="button" class="close hide">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="card-body px-1 py-3">
                            <div class="text-center">
                                <span class="event-date">06 June 2020</span><br>
                                <span class="event-day">Monday</span>
                            </div> 
                            <div class="events-today my-3 px-3">
                               
                            </div> 
                            <div class="input-group events-input mb-3 col-10 mx-auto mt-2">
                                <input type="text" class="form-control" placeholder="일정 입력" id="eventTxt">
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button" id="createEvent">+</button>
                                </div>
                            </div>                        
                        </div>
                    </div>                            
                </div>
            </div>
        </div>
        <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px;">
            <div class="toast" style="position: absolute; top: 0; right: 15px;" data-delay="3000">
                <div class="toast-header">
                <strong class="mr-auto">Calendar</strong>
                <small>Just now</small>
                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="toast-body">
                    
                </div>
            </div>
        </div>`
  document.getElementById('app').innerHTML = calendar
})()

function renderCalendar(m, y) {
  //Month's first weekday
  let firstDay = new Date(y, m, 1).getDay()
  //Days in Month
  let d_m = new Date(y, m + 1, 0).getDate()
  //Days in Previous Month
  let d_pm = new Date(y, m, 0).getDate()

  let table = document.getElementById('dates')
  table.innerHTML = ''
  let s_m = document.getElementById('s_m')
  s_m.innerHTML = months[m] + ' ' + y
  let date = 1
  //remaing dates of last month
  let r_pm = d_pm - firstDay + 1
  //eventsToday 가 json 에 있는지 확인
      let storedEvents = JSON.parse(localStorage.getItem('events'));
      //console.log(storedEvents.length);
      var arrNumber = new Array();//배열
      for(var i = 0;i<storedEvents.length;i++){
        arrNumber[i] = storedEvents[i].eventDate;
        console.log(arrNumber[i]);
      }
      
  
  for (let i = 0; i < 6; i++) {
    let row = document.createElement('tr')
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement('td')
        let span = document.createElement('span')
        let cellText = document.createTextNode(r_pm)
        span.classList.add('ntMonth')
        span.classList.add('prevMonth')
        cell.appendChild(span).appendChild(cellText)
        row.appendChild(cell)
        r_pm++
      } else if (date > d_m && j < 7) {
        if (j !== 0) {
          let i = 0
          for (let k = j; k < 7; k++) {
            i++
            let cell = document.createElement('td')
            let span = document.createElement('span')
            let cellText = document.createTextNode(i)
            span.classList.add('ntMonth')
            span.classList.add('nextMonth')
            cell.appendChild(span).appendChild(cellText)
            row.appendChild(cell)
          }
        }
        break
    } else {
        let cell = document.createElement('td')
        let span = document.createElement('span')
        let cellText = document.createTextNode(date)
        span.classList.add('showEvent')
        //console.log(date+''+m+''+y);
        //1.오늘인 경우
        if (
          date === c_date.getDate() &&
          y === c_date.getFullYear() &&
          m === c_date.getMonth()
        ) {
          span.classList.add('bg-primary')
         
        }
        //2.이벤트가 있는 날인 경우
        for(var k = 0; k<storedEvents.length;k++){
           if(date+''+m+''+y ===arrNumber[k]){
            //이벤트가 있는 경우 노란색동그라미
            span.classList.add('bg-primary-event')
          }
        }
        
       
        cell.appendChild(span).appendChild(cellText)
        row.appendChild(cell)
        date++
      }
    }
    table.appendChild(row)
  }
}
renderCalendar(month, year)

$(function () {
  function showEvent(eventDate) {
    let storedEvents = JSON.parse(localStorage.getItem('events'))
    if (storedEvents == null) {
      $('.events-today').html(
        '<h5 class="text-center">No events found</h5 class="text-center">'
      )
    } else {
      let eventsToday = storedEvents.filter(
        (eventsToday) => eventsToday.eventDate === eventDate
      )
      let eventsList = Object.keys(eventsToday).map((k) => eventsToday[k])
      console.log(eventsList);
      if (eventsList.length > 0) {
        let eventsLi = ''
        eventsList.forEach((event) =>
          $('.events-today').html(
            (eventsLi += `<div class="alert alert-primary alert-dismissible fade show" role="alert">
                    ${event.eventText}
                    <button type="button" class="close remove-event" data-event-id="${event.id}" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>`)
          )

        )
        
      } else {
        $('.events-today').html(
          '<h5 class="text-center">아직 일정이 없습니다.</h5 class="text-center">'
        )
      }
    }
  }
  function removeEvent(id) {
    let storedEvents = JSON.parse(localStorage.getItem('events'))
    if (storedEvents != null) {
      storedEvents = storedEvents.filter((ev) => ev.id != id)
      localStorage.setItem('events', JSON.stringify(storedEvents))
      $('.toast-body').html('일정이 삭제되었습니다.')
      $('.toast').toast('show')
    }
  }
  $(document).on('click', '.remove-event', function () {
    let eventId = $(this).data('event-id')
    removeEvent(eventId)
  })

  $(document).on('click', '.prevMonth', function () {
    year = month === 0 ? year - 1 : year
    month = month === 0 ? 11 : month - 1
    renderCalendar(month, year)
  })
  $(document).on('click', '.nextMonth', function () {
    year = month === 11 ? year + 1 : year
    month = (month + 1) % 12
    renderCalendar(month, year)
  })

  $(document).on('click', '.showEvent', function () {
    $('.showEvent').removeClass('active')
    $('#event').removeClass('d-none')
    $(this).addClass('active')
    let todaysDate = $(this).text() + ' ' + months[month] + ' ' + year
    let eventDay = days[new Date(year, month, $(this).text()).getDay()]
    let eventDate = $(this).text() + month + year
    $('.event-date').html(todaysDate).data('eventdate', eventDate)
    $('.event-day').html(eventDay)
    showEvent(eventDate)
  })
  $(document).on('click', '.hide', function () {
    $('#event').addClass('d-none')
  })
  $(document).on('click', '#createEvent', function () {
    let events = localStorage.getItem('events')
    let obj = []
    if (events) {
      obj = JSON.parse(events)
    }
    let eventDate = $('.event-date').data('eventdate')
    let eventText = $('#eventTxt').val()
    let valid = false
    $('#eventTxt').removeClass('data-invalid')
    $('.error').remove()
    if (eventText == '') {
      $('.events-input').append(
        `<span class="error">일정을 입력해주세요.</span>`
      )
      $('#eventTxt').addClass('data-invalid')
      $('#eventTxt').trigger('focus')
    } else if (eventText.length < 3) {
      $('#eventTxt').addClass('data-invalid')
      $('#eventTxt').trigger('focus')
      $('.events-input').append(
        `<span class="error">3글자 이상 입력 가능합니다.</span>`
      )
    } else {
      valid = true
    }
    if (valid) {
      let id = 1
      if (obj.length > 0) {
        id =
          Math.max.apply(
            '',
            obj.map(function (entry) {
              return parseFloat(entry.id)
            })
          ) + 1
      } else {
        id = 1
      }
      obj.push({
        id: id,
        eventDate: eventDate,
        eventText: eventText,
      })
      localStorage.setItem('events', JSON.stringify(obj))
      $('#eventTxt').val('')
      $('.toast-body').html('Your event have been added')
      $('.toast').toast('show')
      showEvent(eventDate)
    }
  })
})
