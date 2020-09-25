function onMenuKeyDown(event, events) {
  const { up, right, down, left, enter, del, esc } = events;

  switch (event.keyCode) {
    // down
    case 40:
      down && down(event);
      event.preventDefault();
      break;
    // right
    case 39:
      right && right(event);
      event.preventDefault();
      break;
    // up
    case 38:
      up && up(event);
      event.preventDefault();
      break;
    // left
    case 37:
      left && left(event);
      event.preventDefault();
      break;
    // enter
    case 13:
      enter && enter(event);
      event.preventDefault();
      break;
    // delete
    case 8:
      del && del(event);
      break;
    // esc | tab
    case 27:
    case 9:
      esc && esc(event);
      event.preventDefault();
      break;
    default:
  }
}

export default onMenuKeyDown;
