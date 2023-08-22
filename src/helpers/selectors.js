const equalAppointments = (appointments, allId) => {
    const equal = allId.map(id => appointments[id]);
    return equal;
}


export const getAppointmentsForDay =(state, day) => {
    let appointmentArr = [];
    state.days.map(dayObject => {
        if (dayObject.name === day) {
            dayObject.appointments.forEach(apptId => appointmentArr.push(apptId))
        }
    })
    return equalAppointments(state.appointments, appointmentArr);
}

export const getInterview =(state, interview) => {
    if (!interview) {
        return null;
    }

    const interviewerInfo = state.interviewers[interview.interviewer];
    return {
        student: interview.student,
        interviewer: interviewerInfo
    }
};


export const getInterviewersForDay = (state, day) => {
    const dayObj = state.days.find(elem => elem.name === day);
  
    if (!dayObj) {
      return [];
    }
    const interviewerIds = dayObj.interviewers;
    const interviewersForDay = [];
    for (const id in state.interviewers) {
      if (interviewerIds.includes(Number(id))) {
        interviewersForDay.push(state.interviewers[id])
      }
    }
    return interviewersForDay;
  }