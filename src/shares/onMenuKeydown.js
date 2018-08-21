function onMenuKeydown(event, events) {
  const { down, up, enter, del, esc } = events;
  const keyCode = event.keyCode;

  if (keyCode === 40) {
    // down
    down && down(event);
    event.preventDefault();
  } else if (keyCode === 38) {
    // up
    up && up(event);
    event.preventDefault();
  } else if (keyCode === 13) {
    // enter
    enter && enter(event);
    event.preventDefault();
  } else if (keyCode === 8) {
    // delete
    del && del(event);
  } else if (keyCode === 27 || keyCode === 9) {
    // esc | tab
    esc && esc(event);
    event.preventDefault();
  }
}

export default onMenuKeydown;
