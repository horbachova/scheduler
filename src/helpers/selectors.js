const equalAppointments = (appointments, allId) => {
    const equal = allId.map(id => appointments[id]);
    return equal;
  }
  

  function getAppointmentsForDay(state, day) {
    let appointmentArr = [];
    state.days.map(dayObject => {
      if (dayObject.name === day) {
        dayObject.appointments.forEach(apptId => appointmentArr.push(apptId))
      }
    })
    return equalAppointments(state.appointments, appointmentArr);
  }
  
  module.exports = { getAppointmentsForDay };