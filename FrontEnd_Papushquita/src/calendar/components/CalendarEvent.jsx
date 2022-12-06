
export const CalendarEvent = ( { event } ) => {

    const { title, user } = event;


  return (
    <>
        <strong>{ title }</strong>
        <span>-Recordatio hecho por { user.name }</span>
    </>
  )
}
